<?php
/**
 * Intreface DAO
 *
 * @author: http://phpdao.com
 * @date: 2014-08-21 17:28
 */
interface SpeakersDAO{

	/**
	 * Get Domain object by primry key
	 *
	 * @param String $id primary key
	 * @Return Speakers 
	 */
	public function load($id);

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
 	 * @param speaker primary key
 	 */
	public function delete($name);
	
	/**
 	 * Insert record to table
 	 *
 	 * @param Speakers speaker
 	 */
	public function insert($speaker);
	
	/**
 	 * Update record in table
 	 *
 	 * @param Speakers speaker
 	 */
	public function update($speaker);	

	/**
	 * Delete all rows
	 */
	public function clean();

	public function queryByLanguage($value);

	public function queryByOtherName($value);

	public function queryByContacts($value);

	public function queryByImageUrl($value);

	public function queryByOtherImageUrls($value);

	public function queryByViewCount($value);

	public function queryByDescription($value);


	public function deleteByLanguage($value);

	public function deleteByOtherName($value);

	public function deleteByContacts($value);

	public function deleteByImageUrl($value);

	public function deleteByOtherImageUrls($value);

	public function deleteByViewCount($value);

	public function deleteByDescription($value);


}
?>