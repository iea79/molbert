<?php
    $to = 'zakaz@molbert-banket.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = ''.$_POST['subject'].'';
    $message = '
    <html>
        <head>
            <title>' . $subject . '</title>
        </head>
        <body>
            <p>Заявка из блока: ' . $_POST['subject'] . '</p>
            <p>Телефон: ' . $_POST['tel'] . '</p>
            <p>E-mail: ' . $_POST['email'] . '</p>
        </body>
    </html>';
    $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Отправитель <".$to.">\r\n"; //Наименование и почта отправителя
    if (mail($to, $subject, $message, $headers)) {
        echo 'success';
    } else {
        echo 'error';
    }
?>
