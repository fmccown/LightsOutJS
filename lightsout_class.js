class LightsOutGame {
    
   // TODO: Create a constructor with grid size parameter that calls gridSize setter
   
   // TODO: Create gridSize getter and setter (use #gridSize backing field)
   
   newGame() {
       // Boolean array of arrays (2D array) to store on/off values
       this.grid = [];        

       // Create a 2D array
       for (let r = 0; r < this.#gridSize; r++) {    
           this.grid.push(new Array(this.#gridSize));
       }        

       // TODO: Turn lights on/off randomly in grid by assigning true/false; ensure at least 1 light is on
       
   }   

   // TODO: Return grid value at given row and col or undefined if row or col are outside of grid
   getGridValue(row, col) {
 
   }

   // TODO: Invert light at given row and col and all adjacent lights. Throw RangeError if row or col are outside of grid
   flipLights(row, col) {
       
   }

   // TODO: Return true if all lights are out, false if at least one light is on
   isGameOver() {
       
   }

   // For testing purposes - Returns T/F for each light
   get gridState() {
       let str = "";
       for (let r = 0; r < this.#gridSize; r++) {
           for (let c = 0; c < this.#gridSize; c++) {
               str += this.grid[r][c] ? "T" : "F";
           }
       }
       return str;
   }

   // For testing purposes - Sets the grid when gives string of T/F values
   set gridState(value) {
       const gridSize = Math.sqrt(value.length);
       this.gridSize = gridSize;
       for (let r = 0; r < gridSize; r++) {
           for (let c = 0; c < gridSize; c++) {
               this.grid[r][c] = value.charAt(r * gridSize + c) == "T";
           }
       }
   }
}
