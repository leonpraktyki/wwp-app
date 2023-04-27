<!DOCTYPE html>
<html>
<head>
	<title>Strona z danymi z bazy danych</title>
</head>
<body>

<?php
$servername = "192.168.1.148";
$username = "root";
$password = "";
$dbname = "";
$port = "3000";

$conn = new mysqli($servername . ':' . $port, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Nie udało się połączyć z bazą danych: " . $conn->connect_error);
}

$longtitude = $POST['longtitude'];
$type = $_POST['type'];

$sql = "SELECT * FROM data WHERE amenity = '".$amenity." type =".$type."' longtitude = '".$longtitude. "'"";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "amenity: " . $row["amenity"]. " - type: " . $row["type"]. " " . $row["longtitude"]. "<br>";
    }
} else {
    echo "Brak danych do wyświetlenia";
}

$conn->close();
?>

</body>
</html>