<?php
	//include all DAO files
	require_once('class/sql/Connection.class.php');
	require_once('class/sql/ConnectionFactory.class.php');
	require_once('class/sql/ConnectionProperty.class.php');
	require_once('class/sql/QueryExecutor.class.php');
	require_once('class/sql/Transaction.class.php');
	require_once('class/sql/SqlQuery.class.php');
	require_once('class/core/ArrayList.class.php');
	require_once('class/dao/DAOFactory.class.php');
 	
	require_once('class/dao/AudioDAO.class.php');
	require_once('class/dto/Audio.class.php');
	require_once('class/mysql/AudioMySqlDAO.class.php');
	require_once('class/mysql/ext/AudioMySqlExtDAO.class.php');
	require_once('class/dao/SpeakersDAO.class.php');
	require_once('class/dto/Speaker.class.php');
	require_once('class/mysql/SpeakersMySqlDAO.class.php');
	require_once('class/mysql/ext/SpeakersMySqlExtDAO.class.php');
	require_once('class/dao/UsersDAO.class.php');
	require_once('class/dto/User.class.php');
	require_once('class/mysql/UsersMySqlDAO.class.php');
	require_once('class/mysql/ext/UsersMySqlExtDAO.class.php');

?>