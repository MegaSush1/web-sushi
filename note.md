# PHP -> SQL Connection

**Initialized database connection**
```
<?php

$servername ="";
$username = "";
$password = "";
$dbname = "";

$conn = new mysqli($servername,$username,$password,$dbname);

if($conn->connect_error){
  die("conn failed: ".$conn->connect_error);
}

$demande = 'sql query';
$result = $conn->query($demande);

?>
```
**Fetch data**
```
<?php

if($result->num_rows>0){
  while($row=$result->fetch_assoc()){
    echo $row[]
  }
}

?>
```
