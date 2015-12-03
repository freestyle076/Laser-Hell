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
var spawningGroups = { enemies: null, asteroids: null, powerups: null, explosions: null };

// Associated variables 
var spawningVars = 
{
    spawnY : 50,
    minX : 5,
    maxX : game.width - 50,
    asteroidAngleMin: 45,
    asteroidAngleMax: 135,
    asteroidSpeedMin: 250,
    asteroidSpeedMax: 400,
    powerupAngleMin: 45,
    powerupAngleMax: 135,
    powerupSpeedMin: 50,
    powerupSpeedMax: 100,
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
                case 1: spawningGroups.enemies.add(new Slasher(game, 0, 0)); break;
                case 2: spawningGroups.enemies.add(new Slasher(game, 0, 0)); break;
                case 3: spawningGroups.enemies.add(new Slasher(game, 0, 0)); break;
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

        // Make asteroid group
        spawningGroups.asteroids = new Phaser.Group(game, game.world, "asteroids", false, true, Phaser.Physics.ARCADE);
        
        // Create random enemies and add them to the group
        for(var i = 0; i < maxAsteroids; i++)
        {
            randAsteroidType = game.rnd.integerInRange(1, numAsteroidTypes);
            
            switch(randAsteroidType)
            {
                case 1: spawningGroups.asteroids.add(new Projectile('a10001', 'asteroids-atlas', 0, 0, 9999, true)); break;
                case 2: spawningGroups.asteroids.add(new Projectile('a30001', 'asteroids-atlas', 0, 0, 9999, true)); break;
                case 3: spawningGroups.asteroids.add(new Projectile('a40001', 'asteroids-atlas', 0, 0, 9999, true)); break;
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
            var randAngle = game.rnd.integerInRange(spawningVars.asteroidAngleMin, spawningVars.asteroidAngleMax);
            var randSpeed = game.rnd.integerInRange(spawningVars.asteroidSpeedMin, spawningVars.asteroidSpeedMax);
            
            // Fire the asteroid
            randAsteroid.fire(randSpawnX, spawningVars.spawnY, randAngle, randSpeed, 0, 0);
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
        spawningGroups.powerups = new Phaser.Group(game, game.world, "powerups", false, true, Phaser.Physics.ARCADE);
        
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
            var randAngle = game.rnd.integerInRange(spawningVars.powerupAngleMin, spawningVars.powerupAngleMax);
            var randSpeed = game.rnd.integerInRange(spawningVars.powerupSpeedMin, spawningVars.powerupSpeedMax);
            
            // Fire the powerup
            randPowerup.fire(randSpawnX, spawningVars.spawnY, randAngle, randSpeed, 0, 0);
        }
        
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**==========================================================================================================================
    * @name MAKE POWERUPS
    * 
    * @description Creates a group of explosions that will spawn when an asteroid or a ship is exploded (should be ran after
    * asteroid and enemy groups have been formed)
    * 
    * @param {Phaser.GameState} gameState - The main game state that will spawn these 
    *///=========================================================================================================================
    makeExplosions : function(gameState)
    {
        // Helper values
        var maxExplosions = spawningGroups.asteroids.length + spawningGroups.enemies.length + 1;
        
        // Make explosion group
        spawningGroups.explosions = game.add.group();
        spawningGroups.explosions.createMultiple(maxExplosions, 'kaboom');
        
        // Create random explosions and add them to the group
        spawningGroups.explosions.forEach(function(explosion)
        {   
            // Create explosion animation
            var explosionAnim = explosion.animations.add('kaboom');
        }, gameState);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

