// ================================================================================================================================
// spawning.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Helps create a pool and spawn enemy ships, powerups, and asteroids
// ================================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Sprite groups that spawn
var spawningGroups = { enemies: null, asteroids: null, powerups: null };

// Associated variables 
var spawningVars = 
{
    spawnY : 50,
    dieY : game.width + 50,
    minX : 5,
    maxX : game.width - 50,
    asteroidDurationMin: 8000,
    asteroidDurationMax: 11000,
    powerupDurationMin: 9000,
    powerupDurationMax: 13000,
    minDelay: 0,
    maxDelay: 1000,
    primaryUpgraded: false,
    secondaryUpgraded: false
}; 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var spawning = 
{
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    /**==========================================================================================================================
    * @name MAKE ENEMIES
    * 
    * @description Creates a group of enemies that will be reused when spawned
    * 
    * @param {int} maxEnemies - Number of enemies to create in the spawn group
    * @param {int} spawnRate - The amount of time between spawn events for this group
    * @param {Phaser.GameState} gameState - The main game state that will spawn these 
    *///=========================================================================================================================
    makeEnemies : function(maxEnemies, spawnRate, gameState)
    {
        // Helper values
        var numEnemyTypes = 3;
        var randEnemyType = 0;
        
        // Make enemy group
        spawningGroups.enemies = game.add.group();
        spawningGroups.enemies.exists = false;
        spawningGroups.enemies.enableBody = true;
        spawningGroups.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Create random enemies and add them to the group
        for(var i = 0; i < maxEnemies; i++)
        {
            randEnemyType = game.rnd.integerInRange(1, numEnemyTypes);
            
            switch(randEnemyType)
            {
                case 1: spawningGroups.enemies.add(new Destroyer(game, 0, 0)); break;
                case 2: spawningGroups.enemies.add(new Slasher(game, 0, 0)); break;
                case 3: spawningGroups.enemies.add(new Tanker(game, 0, 0)); break;
                default: break;
            }
        }
        
        // Setup spawn event
        game.time.events.loop(spawnRate, this.spawnEnemies, gameState);
    },
    
    /**==========================================================================================================================
    * @name SPAWN ENEMIES
    * 
    * @description Spawns a random enemy from the enemies group into the game
    *///=========================================================================================================================
    spawnEnemies : function()
    {
        // Get random spawn X location
        var randSpawnX = game.rnd.integerInRange(spawningVars.minX, spawningVars.maxX);
        
        // Reset enemy and make exist and reset it
        var randEnemy = Phaser.ArrayUtils.getRandomItem(spawningGroups.enemies.children.filter(function(enemy) { return !enemy.exists; }));
        
        if(randEnemy)
        {
            randEnemy.reset(randSpawnX, spawningVars.spawnY);
        }
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    /**==========================================================================================================================
    * @name MAKE ASTEROIDS
    * 
    * @description Creates a group of asteroids that will be reused when spawned
    * 
    * @param {int} maxAsteroids - Number of asteroids to create in the spawn group
    * @param {int} spawnRate - The amount of time between spawn events for this group
    * @param {Phaser.GameState} gameState - The main game state that will spawn these 
    *///=========================================================================================================================
    makeAsteroids : function(maxAsteroids, spawnRate, gameState)
    {
        // Helper values
        var numAsteroidTypes = 3;
        var randAsteroidType = 0;
        var createdAsteroid = null;
        
        // Make asteroid group
        spawningGroups.asteroids = game.add.group();
        spawningGroups.asteroids.exists = false;
        spawningGroups.asteroids.enableBody = true;
        spawningGroups.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Create random enemies and add them to the group
        for(var i = 0; i < maxAsteroids; i++)
        {
            randAsteroidType = game.rnd.integerInRange(1, numAsteroidTypes);
            
            switch(randAsteroidType)
            {
                case 1: 
                    spawningGroups.asteroids.add(new Projectile
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
                    spawningGroups.asteroids.add(new Projectile
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
                    spawningGroups.asteroids.add(new Projectile
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
        game.time.events.loop(spawnRate, this.spawnAsteroids, gameState);
    },
      
    /**==========================================================================================================================
    * @name SPAWN ASTEROIDS
    * 
    * @description Spawns a random asteroid from the asteroid group into the game and tweens the powerup off the screen.
    *///=========================================================================================================================
    spawnAsteroids : function()
    {
        // Get random asteroid that doesn't currently exist
        var randAsteroid = spawningGroups.asteroids.getFirstExists(false);
        
        // Make sure that it's valid
        if(randAsteroid)
        {
            // Get random spawn information
            var randSpawnX = game.rnd.integerInRange(spawningVars.minX, spawningVars.maxX);
            var randDieX = game.rnd.integerInRange(spawningVars.minX, spawningVars.maxX);
            var randDuration = game.rnd.integerInRange(spawningVars.asteroidDurationMin, spawningVars.asteroidDurationMax);
            var randDelay = game.rnd.integerInRange(spawningVars.minDelay, spawningVars.maxDelay);
            
            // Reset the asteroid
            randAsteroid.reset(randSpawnX, spawningVars.spawnY);
            
            // Make the asteroid tween to the bottom of the screen
            var asteroidTween = game.add.tween(randAsteroid).to({x: randDieX, y: spawningVars.dieY}, randDuration, Phaser.Easing.Bounce.Out, true, randDelay);
            
            // Make sure that the finished tween sets the asteroid to not exist anymore
            asteroidTween.onComplete.add( function() { randAsteroid.exists = false; });
            
            // Play animation
            randAsteroid.play('floating');
        }

    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    /**==========================================================================================================================
    * @name MAKE POWERUPS
    * 
    * @description Creates a group of powerups that will be reused when spawned
    * 
    * @param {int} maxAsteroids - Number of powerups to create in the spawn group
    * @param {int} spawnRate - The amount of time between spawn events for this group
    * @param {Phaser.GameState} gameState - The main game state that will spawn these 
    * @param {int} healingAmount - The amount that healing powerups will heal the player
    * @param {int} coolingAmount - The amount that cooling powerups will cool down the player's primary weapon
    *///=========================================================================================================================
    makePowerups : function(maxPowerups, nextSpawn, gameState, healingAmount, coolingAmount)
    {
        // Helper values
        var numPowerupTypes = 4;
        var randPowerupType = 0;
        
        // Make enemy group
        spawningGroups.powerups = game.add.group();
        spawningGroups.powerups.exists = false;
        spawningGroups.powerups.enableBody = true;
        spawningGroups.powerups.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Create random enemies and add them to the group
        for(var i = 0; i < maxPowerups; i++)
        {
            randPowerupType = game.rnd.integerInRange(1, numPowerupTypes);
            
            switch(randPowerupType)
            {
                case 1: spawningGroups.powerups.add(new HealthPowerup(0, 0, healingAmount)); break;
                case 2: spawningGroups.powerups.add(new CooldownPowerup(0, 0, coolingAmount)); break;
                case 3: spawningGroups.powerups.add(new UpgradePowerup(0, 0, 0)); break;
                case 4: spawningGroups.powerups.add(new UpgradePowerup(0, 0, 1)); break;
                default: break;
            }
        }
        
        // Setup spawn event
        game.time.events.loop(nextSpawn, this.spawnPowerups, gameState);
    },
    
    /**==========================================================================================================================
    * @name SPAWN POWERUPS
    * 
    * @description Spawns a random powerup from the powerups group into the game and tweens the powerup off the screen.
    *///=========================================================================================================================
    spawnPowerups : function()
    {   
        // Get random powerup that doesn't currently exist and reset it
        var randPowerup = Phaser.ArrayUtils.getRandomItem(spawningGroups.powerups.children.filter(function(powerup) { return !powerup.exists; }));
        
        // Make sure these haven't been used to upgrade
        if(randPowerup instanceof UpgradePowerup)
        {
            var skillIndex = randPowerup.skillIndex;
            if(skillIndex === 0 && spawningVars.primaryUpgraded) return;
            if(skillIndex === 1 && spawningVars.secondaryUpgraded) return;
        }
        
        // Make sure that it's valid
        if(randPowerup)
        {
            // Get random spawn information
            var randSpawnX = game.rnd.integerInRange(spawningVars.minX, spawningVars.maxX);
            var randDieX = game.rnd.integerInRange(spawningVars.minX, spawningVars.maxX);
            var randDuration = game.rnd.integerInRange(spawningVars.powerupDurationMin, spawningVars.powerupDurationMax);
            var randDelay = game.rnd.integerInRange(spawningVars.minDelay, spawningVars.maxDelay);
            
            // Reset powerup
            randPowerup.reset(randSpawnX, spawningVars.spawnY);
            
            // Make the powerup tween to the bottom of the screen
            var powerupTween = game.add.tween(randPowerup).to({x: randDieX, y: spawningVars.dieY}, randDuration, Phaser.Easing.Sinusoidal.In, true, randDelay);
            
            // Make sure that the finished tween sets the powerup to not exist anymore
            powerupTween.onComplete.add( function() { randPowerup.exists = false; });
        }
        
    }
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

