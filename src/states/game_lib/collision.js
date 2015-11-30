// ================================================================================================================================
// collision.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Handles all of the collision logic for the game.
// ================================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var collisionVars = 
{
    enemyPoints: 100,
    asteroidPoints: 25 
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var collision = 
{
    /**==========================================================================================================================
    * @name ENEMYSHIP_PLAYERSHIP
    * 
    * @description Performs collision handling between an enemy ship and the player ship. It kills both the enemy and the player
    * and displays a game over screen.
    *///=========================================================================================================================
    enemyShip_playerShip: function(enemy, player)
    {
        
        // set health status bar of player to 0
        game.state.states['Game'].updateStatusBar('health', 0, player.maxHealth);

        // Kill enemy and player
        enemy.die();
        player.die();
        
        // Set a short timeout so you can see the explosions
        setTimeout(function() 
        {
            // Take a screenshot of the screen to "fake" a pop-up and pass this to the options state
            game.state.states['GameOver'].canvasImage = gameUtils.getCanvasScreenshot();
            game.state.start('GameOver');
        }, 1000);
    },
    
    /**==========================================================================================================================
    * @name ENEMYSHIP_PROJECTILE
    * 
    * @description Performs collision handling between an enemy ship and a projectile. It damages the enemy, kills the
    * projectile, and, if the enemy is dead, kills the enemy and rewards the player with points.
    *///=========================================================================================================================
    enemyShip_projectile: function(enemy, projectile)
    {
        //console.log("==================BEFORE=");
        //console.log("Enemy.health: " + enemy.health);
        //console.log("Projectile.damage: " + projectile.damage);
        
        // Apply damage
        projectile.applyDamage(enemy);
        
        //console.log("==================AFTER=");
        //console.log("Enemy.health: " + enemy.health);
        //console.log("Projectile.damage: " + projectile.damage);
        
        // Kill the projectile
        projectile.die();
        
        // Increase score if the enemy died
        if(enemy.isDead())
        {
            // Kill enemy
            enemy.die();
        
            // Update score
            game.state.states['Game'].updateScore(collisionVars.enemyPoints, false);
        }
    },
    
    /**==========================================================================================================================
    * @name PLAYERSHIP_PROJECTILE
    * 
    * @description Performs collision handling between the player ship and a projectile. It damages the player, kills the 
    *  projectile, lowers the player's health bar, and, if the player is dead, kills the player and starts the game over screen.
    *///=========================================================================================================================
    playerShip_projectile: function(player, projectile)
    {
        // Apply damage
        projectile.applyDamage(player);
        
        // Kill the projectile
        projectile.die();

        // Update health bar of player
        game.state.states['Game'].updateStatusBar('health', player.shipHealth, player.maxHealth);
        
        // if the player is zero health then timeout to game over
        if(player.isDead())
        {
            // explode and remove player ship
            player.die();

            // Set a short timeout so you can see the explosions
            setTimeout(function() 
            {
                // Take a screenshot of the screen to "fake" a pop-up and pass this to the options state
                game.state.states['GameOver'].canvasImage = gameUtils.getCanvasScreenshot();
                game.state.start('GameOver');
            }, 1000);
        }
    },
    
    /**==========================================================================================================================
    * @name PLAYERSHIP_POWERUP
    * 
    * @description Performs collision handling between the player ship and a powerup. It applies the powerup to the player and
    * kills the powerup.
    *///=========================================================================================================================
    playerShip_powerup: function(player, powerup)
    {
        // Apply powerup
        powerup.applyPowerup(player);
        
        // Kill the powerup
        powerup.die();
    },
    
    /**==========================================================================================================================
    * @name PROJECTILE_PROJECTILE
    * 
    * @description Performs collision handling between two projectiles (namely, for asteroids and bullets). Awards the player
    * points upon the death of both projectiles.
    *///=========================================================================================================================
    projectile_projectile: function(thisProjectile, thatProjectile)
    {
        // Kill both projectiles
        thisProjectile.die();
        thatProjectile.die();
        
        // Update score
        game.state.states['Game'].updateScore(collisionVars.asteroidPoints, false);
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////