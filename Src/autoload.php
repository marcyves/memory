<?php
// ici lors de l'appel : use Application\Controller\Router;     $full_class_name sera égal à Application\Controller\Router
 
$autoloader = function($full_class_name) {
    // on prépare le terrain : on remplace le séparteur d'espace de nom par le séparateur de répertoires du système
    $name = str_replace('\\', DIRECTORY_SEPARATOR, $full_class_name);
    // on sépare en parties le nom complet de manière à isoler Application
    $parts = explode('Application', $name, 2);
 
    // on remplace Application par le nom du répertoire racine qui contient tous les fichiers
    $parts[0] = 'src';
 
    // on construit le chemin complet du fichier à inclure :
    // il faut que l'autoloader soit toujours à la racine du site : tout part de là avec __DIR__
    $path = __DIR__.DIRECTORY_SEPARATOR.implode('', $parts).'.php';    // $path = répertoire racine du site web/src/Controller/Router.php
 
    // on vérfie qu'il existe bien et on l'inclut
    // sinon on passe la main à une autre autoloader (return false)
    // tu peux empiler les autoloader sans problèmes jusqu'à tomber sur celui qui sera capable de localiser physiquement sur ton disque le fichier recherché
    if (is_file($path)) {
        include $path;
        return true;
    } else {
        return false;
    }
};
 
spl_autoload_register($autoloader);