<?php

namespace App;

use App\Transformers\CardTransformer;
use App\Transformers\InvoiceTransformer;
use App\Transformers\TransformerManager;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Laravel\Cashier\Billable;
use Laravel\Cashier\Contracts\Billable as BillableContract;
use Cache;
use Carbon\Carbon;
use Laravel\Cashier\StripeGateway;

class User extends BaseModel implements AuthenticatableContract, CanResetPasswordContract, BillableContract
{
    use Authenticatable, CanResetPassword, Billable;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = array('id', 'remember_token');

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    protected $appends = array('full_name');

    protected $transformerClass = 'App\Transformers\UserTransformer';

    protected $dates = ['trial_ends_at', 'subscription_ends_at'];

    public function getFullNameAttribute($value)
    {
        return (empty($this->attributes['first_name']) && empty($this->attributes['last_name'])) ? '' : $this->attributes['first_name'] . ' ' . $this->attributes['last_name'];
    }

    public function photo()
    {
        return $this->hasOne('App\UploadedFile', 'id', 'photo_id');
    }

    public function getPhotoUrl()
    {
        return $this->photo && $this->photo->url ? $this->photo->url : '/images/profile-default.png';
    }

    public function getCard()
    {
        $customer = $this->getStripeCustomer();

        if (!$customer || empty($customer->sources->data)) {
            return null;
        }

        $card = $customer->sources->data[0];
        $card->user_id = $this->id;

        return TransformerManager::transformDataToArray(
            new CardTransformer,
            $card,
            'Item'
        );
    }

    public function getInvoices()
    {
        if (!$this->stripe_id) {
            return [];
        }

        $invoices = Cache::remember($this->getCacheKeyStripeInvoices(), $this->getCacheExpiresAt(), function() {
            return $this->invoices();
        });

        foreach ($invoices as $key => &$invoice) {
            if (!$invoice->total) {
                // don't show invoices with zero amount
                unset($invoices[$key]);
            }
        }

        return TransformerManager::transformDataToArray(
            new InvoiceTransformer($this),
            $invoices
        );
    }

    public function getStripeCustomer()
    {
        if (!$this->stripe_id) {
            return null;
        }

        $customer = Cache::remember($this->getCacheKeyStripeCustomer(), $this->getCacheExpiresAt(), function() {
            return (new StripeGateway($this))->getStripeCustomer($this->stripe_id);
        });

        return $customer;
    }

    public function changePlan($plan, $token = null)
    {
        $this->subscription($plan['id'])->create($token, [], $this->getStripeCustomer());
        $this->clearStripeCache();
        return $this->save();
    }

    public function cancelPlan()
    {
        return $this->changePlan(Plan::free());
    }

    public function removePlan()
    {
        $this->subscription()->cancel();
        $this->clearStripeCache();
        return $this->save();
    }

    public function clearStripeCache()
    {
        Cache::forget($this->getCacheKeyStripeInvoices());
        Cache::forget($this->getCacheKeyStripeCustomer());
    }

    protected function getCacheExpiresAt()
    {
        return Carbon::now()->addMinutes(30);
    }

    protected function getCacheKeyStripeCustomer()
    {
        return sprintf('stripe_customer_%s', $this->id);
    }

    protected function getCacheKeyStripeInvoices()
    {
        return sprintf('stripe_invoices_%s', $this->id);
    }

}
