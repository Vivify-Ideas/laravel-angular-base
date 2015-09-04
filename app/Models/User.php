<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Laravel\Cashier\Billable;
use Laravel\Cashier\Contracts\Billable as BillableContract;

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

        protected function getCacheExpiresAt()
    {
        return Carbon::now()->addMinutes(30);
    }

    protected function getCacheKeyStripeCustomer()
    {
        return sprintf('stripe_customer_%s', $this->id);
    }

}
