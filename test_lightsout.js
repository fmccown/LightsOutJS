describe("LightsOutGame class", function() {

   beforeEach(function() {

   });

   it('LightsOutGame class is defined', function() {
      // A class is actually a function
      assert.isFunction(LightsOutGame);
   });
 
   describe('newGame() method', function() {
      it('newGame() randomizes grid', function() {
         const game = new LightsOutGame(3);
         let currentGrid = game.gridState;
         game.newGame();
         assert.notEqual(currentGrid, game.gridState);
      });
 
      it('newGame() always produces at least 1 off square', function() {
         const game = new LightsOutGame(3);

         // Create many new games and count how many times a game doesn't have at least 1 on light
         let allOffCount = 0;
         for (let c = 0; c < 10000; c++) {
            game.newGame();
            let onLight = false;
            
            // Look for on lights
            for (let r = 0; r < game.gridSize; r++) {
               for (let c = 0; c < game.gridSize; c++) {
                  if (game.getGridValue(r, c)) {
                     onLight = true;

                     // Leave for loops
                     c = game.gridSize;
                     r = game.gridSize;
                  }
               }
            }

            if (!onLight) {
               allOffCount++;
            }
         }

         assert.equal(0, allOffCount);
      });
   });
   
   describe('gridSize property', function() {
      it('gridSize getter retrieves setter value', function() {
         const game = new LightsOutGame(3);
         const validSizes = [3, 4, 5, 6, 7];
         for (let size of validSizes) {
            game.gridSize = size;
            assert.equal(size, game.gridSize);
         }               
      });

      it('gridSize setter throws exception for invalid values', function() {
         const game = new LightsOutGame(3);
         const invalidSizes = [1, 2, 8, 9];
         for (const size of invalidSizes) {            
            assert.throws(function() {
               game.gridSize = size;
            }, RangeError);
         }               
      });
   });

   describe('getGridValue() method', function() {
      it('getGridValue() returns boolean for valid row and columns', function() {
         const game = new LightsOutGame(3);
         for (let r = 0; r < game.gridSize; r++) {
            for (let c = 0; c < game.gridSize; c++) {
               assert.isBoolean(game.getGridValue(r, c));
            }
         }               
      });

      it('getGridValue() returns undefined for invalid rows and columns', function() {
         const game = new LightsOutGame(3);

         const invalidRowColValues = [-1, game.gridSize + 1];
         for (const rowCol of invalidRowColValues) {
            assert.isUndefined(game.getGridValue(0, rowCol));   
            assert.isUndefined(game.getGridValue(rowCol, 0));   
         }
      });
   });

   describe('flipLights() method', function() {
      it('flipLights() inverts adjacent lights', function() {      
         const game = new LightsOutGame(3);
         
         const testMoves = [
            {  row: 0, col: 0,
               before: "TTT" + 
                       "FFF" + 
                       "TTT",
               after:  "FFT" + 
                       "TTF" + 
                       "TTT"
            },
            {  row: 0, col: 1,
               before: "TTT" + 
                       "FFF" + 
                       "TTT",
               after:  "FFF" + 
                       "TTT" + 
                       "TTT"
            },
            {  row: 0, col: 2,
               before: "TTT" + 
                       "FFF" + 
                       "TTT",
               after:  "TFF" + 
                       "FTT" + 
                       "TTT"
            },
            {  row: 1, col: 1,
               before: "TTT" + 
                       "FFF" + 
                       "TTT",
               after:  "FFF" + 
                       "TTT" + 
                       "FFF"
            },
            {  row: 2, col: 0,
               before: "TTT" + 
                       "FFF" + 
                       "TTT",
               after:  "TTT" + 
                       "TTF" + 
                       "FFT"
            },
            {  row: 2, col: 1,
               before: "TTT" + 
                       "FFF" + 
                       "TTT",
               after:  "TTT" + 
                       "TTT" + 
                       "FFF"
            },
            {  row: 2, col: 2,
               before: "TTT" + 
                       "FFF" + 
                       "TTT",
               after:  "TTT" + 
                       "FTT" + 
                       "TFF"
            }
         ];

         for (let move of testMoves) {
            game.gridState = move.before;
            game.flipLights(move.row, move.col);
            assert.equal(move.after, game.gridState);
         }          
      });

      it('flipLights() throws exception for invalid rows and columns', function() {
         const game = new LightsOutGame(3);
         const invalidRowColValues = [-1, game.gridSize + 1];
         for (const rowCol of invalidRowColValues) {
            assert.throws(function() {
               game.flipLights(0, rowCol);
            }, RangeError);
            assert.throws(function() {
               game.flipLights(rowCol, 0);
            }, RangeError);
         }          
      });
   });

   describe('isGameOver() method', function() {
      it('isGameOver() returns true when all lights are out', function() {
         const game = new LightsOutGame(3);
         game.gridState = "FFFFFFFFF";
         assert.isTrue(game.isGameOver());
      });

      it('isGameOver() returns false when at least one light is on', function() {
         const game = new LightsOutGame(3);

         const gridStates = ["TFFFFFFFF", "FFFFTFFFF", "FFFFFFFFT"];
         for (const gridState of gridStates) {
            game.gridState = gridState;
            assert.isFalse(game.isGameOver());
         }
      });
   });
});