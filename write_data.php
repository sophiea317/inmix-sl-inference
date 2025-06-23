<?php
// get the data from the POST message
$post_data = json_decode(file_get_contents('php://input'), true);
$data = $post_data['filedata'];
$filename = $post_data['filename'];
// generate a unique ID for the file, e.g., session-6feu833950202
$fid = uniqid("session-");
// the directory "data" must be writable by the server
$name = "data/{$filename}.csv";
// write the file to disk
file_put_contents($name, $data);
// send a response back to the client
echo json_encode(["success" => true, "filename" => $name]);
// log the file creation
error_log("File created: {$name}");
?>