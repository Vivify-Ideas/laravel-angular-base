<?php

namespace App;

trait StaticModelTrait 
{
    protected static $arrayKeys;
    protected static $items;

    public static function all()
    {
        return self::getItems();
    }

    public static function first()
    {
        return array_values(self::getItems())[0];
    }

    public static function getByKey($key)
    {
        $keyField = isset(self::$keyField) ? self::$keyField : self::getDefaultKey();

        foreach (self::all() as $item) {
            if ($item[$keyField] == $key) {
                return $item;
            }
        }

        return false;
    }

    public static function getList()
    {
        $keyField = isset(self::$keyField) ? self::$keyField : self::getDefaultKey();
        $valueField = isset(self::$valueField) ? self::$valueField : self::getDefaultValue();

        $list = [];
        foreach (self::all() as $item) {
            $list[$item[$keyField]] = $item[$valueField];
        }

        return $list;
    }

    protected static function getArrayKeys()
    {
        if(!self::$arrayKeys) {
            self::$arrayKeys = array_keys(self::first());
        }

        return self::$arrayKeys;
    }

    protected static function getDefaultKey()
    {
        return self::getArrayKeys()[0];
    }

    protected static function getDefaultValue()
    {
        return self::getArrayKeys()[1];
    }

    protected static function getItems() 
    {
        return self::$items;
    }
}