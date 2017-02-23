<?php
$schemadir = dirname(__FILE__) . '/../schema';

$swaggerfile = 'salesviewer-api.swagger.min.json';


$cnt = json_decode(file_get_contents($swaggerfile));

if(empty($cnt) || !isset($cnt->definitions)){
    die('definitions are missing!');
}

function updateRefs(&$value){
  if(is_object($value)){
    foreach($value as $k => &$v){
      updateRefs($&v);
    }
    return;
  }
  if(!is_string($value)) return;
  
  $value = str_replace('#/definitions');
}

foreach($cnt->definitions as $modelName => $model){
  $file = sprintf('%s/%s.json', $schemadir, $modelName);
  $json = json_encode($model, JSON_PRETTY_PRINT);
  file_put_contents($file, $json);
  
  $file = sprintf('%s/%s.min.json', $schemadir, $modelName);
  $json = json_encode($model);
  file_put_contents($file, $json);
}