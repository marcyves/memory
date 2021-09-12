<?php

namespace Gateway;

class ScoreGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll()
    {
        $statement = "
            SELECT 
                *
            FROM
                wall_of_fame;
        ";

        try {
            $statement = $this->db->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function insert(Array $input)
    {
        $sql = "INSERT INTO `wall_of_fame` 
            (`name`, `score`) 
        VALUES
            (:name, :score);
            ";

        try{
            $sql = $this->db->prepare($sql);
            $sql->execute(array(
                'name' => $input['name'],
                'score' => $input['score']
            ));
            return $sql->rowCount();
        } catch (\PDOException $e){
            exit($e->getMessage());
        }
    }
}