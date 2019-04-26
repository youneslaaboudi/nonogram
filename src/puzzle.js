import Nonogram from './nonogram';


/**
 * @class
 * @type {Nonogram.Puzzle}
 * @this Nonogram.Puzzle
 *
 * the main puzzle class containing the grid of cells, row/column hints, etc.
 *
 * @property {number} this.width
 * @property {number} this.height
 * @property {number} this.totalCells
 * @property {array} this.cells
 * @property {array} this.rowHints
 * @property {array} this.columnHints
 * @property {Nonogram.Creator|null} creator
 * @property {array} this.grid - a multi-dimensional array representing rows and columns.
 *                   for example a 2x2 grid could be represented by [[0,1],[0,0]]
 */
Nonogram.Puzzle = class
{
	/**
	 * @param {number} width - an integer >= 1 specifying the number of rows
	 * @param {number} height - an integer >= 1 specifying the number of columns
	 * @throws - error if width or height are invalid
	 */
	constructor( width, height )
	{
		if (typeof width === 'undefined' || typeof height === 'undefined') {

			throw('width and height are required constructor parameters.');

		} else if ((width <= 0 || height <= 0) || (width === 1 && height === 1)) {

			throw('invalid dimensions: ' + width.toString() + ' x ' + height.toString());
		}

		this.width      = typeof width === 'number' ? width : parseInt( width.toString(), 10 );
		this.height     = typeof height === 'number' ? height : parseInt( height.toString(), 10 );
		this.totalCells = this.width * this.height;

		this.reset();
	}


	/**
	 * empty all arrays and create zero-filled multidimensional grid array
	 */
	reset()
	{
		const zeroFill = Nonogram.Utility.getZeroFilledArray;

		this.creator     = null;
		this.cells       = [];
		this.rowHints    = [];
		this.columnHints = [];
		this.grid        = zeroFill( this.height ).map( () =>
		{
			return zeroFill( this.width );
		} );
	}


	/**
	 * @returns {boolean}
	 */
	checkUserSolution()
	{
		return this.cells.every( ( cell ) =>
		{
			// cell.solution will be 0 or 1, but cell.userSolution might be null, 0 or 1
			const userValue = cell.userSolution === 1 ? 1 : 0;

			return cell.solution === userValue;
		} );
	}


	/**
	 * @param {number} row
	 * @returns {array|boolean}
	 */
	getRowCells( row )
	{
		const self  = this,
			  cells = [];

		self.cells.forEach( ( cell ) =>
		{
			if (cell.row === row) {
				cells.push( cell );
			}
		} );

		return cells.length > 0 ? cells : false;
	}


	/**
	 * @param {number} column
	 * @returns {array|boolean}
	 */
	getColumnCells( column )
	{
		const self  = this,
			  cells = [];

		self.cells.forEach( ( cell ) =>
		{
			if (cell.column === column) {
				cells.push( cell );
			}
		} );

		return cells.length > 0 ? cells : false;
	}


	/**
	 * @param {number|string} index
	 * @returns {object|boolean}
	 */
	getCellByIndex( index )
	{
		const indexInt = typeof index !== 'number' ? parseInt( index, 10 ) : index;

		return this.cells[indexInt] ? this.cells[indexInt] : false;
	}

};


