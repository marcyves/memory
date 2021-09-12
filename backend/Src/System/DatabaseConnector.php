<?php

namespace System;

class DatabaseConnector {

    private $dbConnection = null;

    public function __construct()
    {
        $host = "127.0.0.1";
        $port = "3306c";
        $db   = "memory";
        $user = "memory";
        $pass = "topsecret";

        try {
            $this->dbConnection = new \PDO(
                "mysql:host=$host;port=$port;dbname=$db",
                $user,
                $pass
            );
        } catch (\PDOException $e) {
            exit("Erreur connexion DB : " . $e->getMessage());
        }
    }

    public function getConnection()
    {
        return $this->dbConnection;
    }
}