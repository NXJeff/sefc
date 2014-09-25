<?php

/**
 * DAOFactory
 * @author: http://phpdao.com
 * @date: ${date}
 */
class DAOFactory{
	
	/**
	 * @return AudioDAO
	 */
	public static function getAudioDAO(){
		return new AudioMySqlExtDAO();
	}

	public static function getSpeakersDAO(){
		return new SpeakersMySqlExtDAO();
	}
	public static function getUsersDAO(){
		return new UsersMySqlExtDAO();
	}

}
?>