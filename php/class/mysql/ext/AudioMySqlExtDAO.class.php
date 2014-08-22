<?php
/**
 * Class that operate on table 'audio'. Database Mysql.
 *
 * @author: http://phpdao.com
 * @date: 2014-08-21 10:57
 */
error_reporting(E_ALL & ~E_NOTICE);
class AudioMySqlExtDAO extends AudioMySqlDAO{

	/**
	 * Pagination Fetching for Audios
	 *
	 * @param $orderColumn column name
	 */
	public function queryLazyLoad($offset, $item, $orderColumn, $orderAs){

		if(!$offset || !$item) {
			$offset = 0;
			$item = 10;
			// $orderColumn = 'title';
			// $orderAs = 'desc';
		}

		$sql = 'SELECT * FROM audio ';

		if(!$this->IsNullOrEmptyString($orderColumn))
		{ 
			$sql .= ' ORDER BY ' .$orderColumn; 
		}

		if(!$this->IsNullOrEmptyString($orderAs)) 
		{ 
			$sql .= ' '.$orderAs. ' '; 
		}

		$sql .= 'LIMIT ' . $offset .','. $item;
		
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}

	function IsNullOrEmptyString($question){
		return (!isset($question) || trim($question)==='');
	}



}
?>