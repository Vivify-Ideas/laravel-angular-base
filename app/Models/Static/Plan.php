<?php

namespace App;

use Stripe\Stripe;
use Stripe\Plan as StripePlan;
use Config;

class Plan 
{
    use StaticModelTrait;

    protected static $keyField = 'id';
    protected static $valueField = 'name';
    protected static $items;

    public static function free()
    {
        foreach (self::getItems() as $item) {
            if($item['amount'] <= 0) {
                return $item;
            }
        }
    }

    protected static function getItems() {
        if(!self::$items) {
            self::getStripePlans();
        }

        return self::$items;
    }

    private static function getStripePlans()
    {
        Stripe::setApiKey(Config::get('services.stripe.secret'));
        $plans = StripePlan::all();

        if(!$plans) {
            return false;
        }

        self::$items = [];
        foreach($plans->data as $plan) {
            $item = $plan->__toArray();

            if($item['amount'] > 0) {
                $item['amount'] = $item['amount'] / 100;
            }

            self::$items[] = $item;
        }

    }
}
