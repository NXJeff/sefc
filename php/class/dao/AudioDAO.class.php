<?php
/**
 * Intreface DAO
 *
 * @author: http://phpdao.com
 * @date: 2014-09-26 15:58
 */
interface AudioDAO{

	/**
	 * Get Domain object by primry key
	 *
	 * @param String $id primary key
	 * @Return Audio 
	 */
	public function load($title, $speaker);

	/**
	 * Get all records from table
	 */
	public function queryAll();
	
	/**
	 * Get all records from table ordered by field
	 * @Param $orderColumn column name
	 */
	public function queryAllOrderBy($orderColumn);
	
	/**
 	 * Delete record from table
 	 * @param audio primary key
 	 */
	public function delete($title, $speaker);
	
	/**
 	 * Insert record to table
 	 *
 	 * @param Audio audio
 	 */
	public function insert($audio);
	
	/**
 	 * Update record in table
 	 *
 	 * @param Audio audio
 	 */
	public function update($audio);	

	/**
	 * Delete all rows
	 */
	public function clean();

	public function queryByDescription($value);

	public function queryByUploadedUser($value);

	public function queryBySource($value);

	public function queryByCategory($value);

	public function queryByLanguage($value);

	public function queryByDuration($value);

	public function queryByAddedDate($value);

	public function queryByFilesize($value);

	public function queryByPlayCount($value);

	public function queryByUrl($value);


	public function deleteByDescription($value);

	public function deleteByUploadedUser($value);

	public function deleteBySource($value);

	public function deleteByCategory($value);

	public function deleteByLanguage($value);

	public function deleteByDuration($value);

	public function deleteByAddedDate($value);

	public function deleteByFilesize($value);

	public function deleteByPlayCount($value);

	public function deleteByUrl($value);


}
?>