// ================================================================================================================================
// spawning.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// 
// ================================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var spawning = 
{
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    spawnY : -100,
    dieY : game.width + 100,
    minX : 5,
    maxX : game.width - 5,
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    /**==========================================================================================================================
    * @name APPLY POWERUP
    * 
    * @description Heals the ship that collected the powerup
    * 
    * @param {Ship} sourceShip - Ship that collected the powerup
    *///=========================================================================================================================
    makeEnemies : function(maxEnemies, nextSpawn, gameState)
    {
        // Helper values
        var numEnemyTypes = 3;
        var randEnemyType = 0;
        
        // Make enemy group
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Create random enemies and add them to the group
        for(var i = 0; i < maxEnemies; i++)
        {
            randEnemyType = game.rnd.integerInRange(1, numEnemyTypes);
            
            switch(randEnemyType)
            {
                case 1: this.enemies.add(new Destroyer(game, 0, 0)); break;
                case 2: this.enemies.add(new Slasher(game, 0, 0)); break;
                case 3: this.enemies.add(new Tanker(game, 0, 0)); break;
                default: break;
            }
        }
        
        // Setup spawn event
        game.time.events.loop(nextSpawn, spawnEnemies, gameState);
    },
    
    /**==========================================================================================================================
    * @name APPLY POWERUP
    * 
    * @description Heals the ship that collected the powerup
    * 
    * @param {Ship} sourceShip - Ship that collected the powerup
    *///=========================================================================================================================
    spawnEnemies : function()
    {
        this.enemies.getFirstExists(false).act();
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    /**==========================================================================================================================
    * @name APPLY POWERUP
    * 
    * @description Heals the ship that collected the powerup
    * 
    * @param {Ship} sourceShip - Ship that collected the powerup
    *///=========================================================================================================================
    makeAsteroids : function(maxAsteroids, nextSpawn, gameState)
    {
        // Helper values
        var numAsteroidTypes = 4;
        var randAsteroidType = 0;
        
        // Make asteroid group
        this.asteroids = game.add.group();
        this.asteroids.enableBody = true;
        this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Create random enemies and add them to the group
        for(var i = 0; i < maxAsteroids; i++)
        {
            randAsteroidType = game.rnd.integerInRange(1, numAsteroidTypes);
            
            switch(randAsteroidType)
            {
                case 1: 
                    this.asteroids.add(new Projectile
                    (
                        'a10001', 
                        'asteroids-atlas', 
                        0, 
                        0, 
                        9999, 
                        new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4), 
                        new gameUtils.FramesInfo("a1", 0, 14, "", 4)
                    )); 
                    break;
                    
                case 2: 
                    this.asteroids.add(new Projectile
                    (
                        'a20001', 
                        'asteroids-atlas', 
                        0, 
                        0, 
                        9999, 
                        new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4), 
                        new gameUtils.FramesInfo("a2", 0, 14, "", 4)
                    )); 
                    break;
                
                case 3: 
                    this.asteroids.add(new Projectile
                    (
                        'a30001', 
                        'asteroids-atlas', 
                        0, 
                        0, 
                        9999, 
                        new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4), 
                        new gameUtils.FramesInfo("a3", 0, 14, "", 4)
                    )); 
                    break;
                    
                case 3: 
                    this.asteroids.add(new Projectile
                    (
                        'a40001', 
                        'asteroids-atlas', 
                        0, 
                        0, 
                        9999, 
                        new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4), 
                        new gameUtils.FramesInfo("a4", 0, 14, "", 4)
                    )); 
                    break;
                
                default: break;
            }
        }
        
        // Setup spawn event
        game.time.events.loop(nextSpawn, spawnAsteroids, gameState);
    },
    
    /**==========================================================================================================================
    * @name APPLY POWERUP
    * 
    * @description Heals the ship that collected the powerup
    * 
    * @param {Ship} sourceShip - Ship that collected the powerup
    *///=========================================================================================================================
    spawnAsteroids : function()
    {
        // Get random spawn X location
        var randSpawnX = game.rnd.integerInRange(minX, maxX);
        var randDieX = game.rnd.integerInRange(minX, maxX);
        
        // Get random asteroid
        var randAsteroid = this.asteroids.getFirstExists(false).reset(randSpawnX, spawnY);
        
        // Make the asteroid tween to the bottom of the screen
        game.add.tween(randAsteroid).to({x: randDieX, y: dieY}, 2400, Phaser.Easing.Bounce.Out, true, 1000, false);
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    /**==========================================================================================================================
    * @name APPLY POWERUP
    * 
    * @description Heals the ship that collected the powerup
    * 
    * @param {Ship} sourceShip - Ship that collected the powerup
    *///=========================================================================================================================
    makePowerups : function(maxPowerups, nextSpawn, gameState, healingAmount, coolingAmount)
    {
        // Helper values
        var numPowerupTypes = 4;
        var randPowerupType = 0;
        
        // Make enemy group
        this.powerups = game.add.group();
        this.powerups.enableBody = true;
        this.powerups.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Create random enemies and add them to the group
        for(var i = 0; i < maxPowerups; i++)
        {
            randPowerupType = game.rnd.integerInRange(1, numPowerupTypes);
            
            switch(randPowerupType)
            {
                case 1: this.powerups.add(new HealthPowerup('health_pickup', 0, 0, healingAmount)); break;
                case 2: this.powerups.add(new CooldownPowerup('coolant_pickup', 0, 0, coolingAmount)); break;
                case 3: this.powerups.add(new UpgradePowerup('primary_upgrade_pickup', 0, 0, 0)); break;
                case 4: this.powerups.add(new UpgradePowerup('secondary_upgrade_pickup', 0, 0, 1)); break;
                default: break;
            }
        }
        
        // Setup spawn event
        game.time.events.loop(nextSpawn, spawnEnemies, gameState);
    },
    
    spawnPowerups : function()
    {
        
    }
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

