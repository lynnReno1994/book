<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/book', 'getAllBook');
$app->get('/book/:id', 'getBook');
$app->post('/book', 'addBook');
$app->put('/book/:id', 'updateBook');
$app->delete('/book/:id', 'deleteBook');

$app->run();

function getConnection()
{
    $dbhost = "127.0.0.1";
    $dbuser = "root";
    $dbpass = "";
    $dbname = "book";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}

function getAllBook()
{
    $sql = "SELECT id, name, author, press FROM book ORDER BY id ASC";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $book = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"book": ' . json_encode($book) . '}';
    } catch (PDOException $e) {
        error_log($e->getMessage(), 3, '../api/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

function getBook($id)
{
    $sql = "SELECT * FROM book WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $book = $stmt->fetchObject();
        $db = null;
        echo json_encode($book);
    } catch (PDOException $e) {
        error_log($e->getMessage(), 3, '../api/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

function addBook()
{
    $request = Slim::getInstance()->request();
    $book = json_decode($request->getBody());
    $sql = "INSERT INTO book (name, author, press, description) VALUES (:name, :author, :press, :description)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $book->name);
        $stmt->bindParam("author", $book->author);
        $stmt->bindParam("press", $book->press);
        $stmt->bindParam("description", $book->description);
        $stmt->execute();
        $book->id = $db->lastInsertId();
        $db = null;
        echo json_encode($book);
    } catch (PDOException $e) {
        error_log($e->getMessage(), 3, '../api/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

function updateBook($id)
{
    $request = Slim::getInstance()->request();
    $body = $request->getBody();
    $book = json_decode($body);
    $sql = "UPDATE book SET name=:name, author=:author, press=:press, description=:description WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $book->name);
        $stmt->bindParam("author", $book->author);
        $stmt->bindParam("press", $book->press);
        $stmt->bindParam("description", $book->description);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
        echo json_encode($book);
    } catch (PDOException $e) {
        error_log($e->getMessage(), 3, '../api/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

function deleteBook($id)
{
    $sql = "DELETE FROM book WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
    } catch (PDOException $e) {
        error_log($e->getMessage(), 3, '../api/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

?>