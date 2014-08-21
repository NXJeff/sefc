<?php
/**
 * Class that operate on table 'audio'. Database Mysql.
 *
 * @author: http://phpdao.com
 * @date: 2014-08-21 10:57
 */
class AudioMySqlExtDAO extends AudioMySqlDAO{

	/**
	 * Pagination Fetching for Audios
	 *
	 * @param $orderColumn column name
	 */
	public function queryLazyLoad($offset, $item, $orderColumnm, $orderAs){

		$sql = 'SELECT * FROM audio LIMIT ' . $offset .','. $item . 'ORDER BY '.$orderColumn . $orderAs;
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}

	
}
?>