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


}
?>