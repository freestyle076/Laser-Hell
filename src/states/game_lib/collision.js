// ================================================================================================================================
// collision.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// 
// ================================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var collisionVars = 
{
    enemyPoints: 50
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var collision = 
{
    enemyShip_playerShip: function(enemy, player)
    {
        // Kill enemy and player
        enemy.die();
        player.die();
        
        // Take a screenshot of the screen to "fake" a pop-up and pass this to the options state
        game.state.states['GameOver'].canvasImage = gameUtils.getCanvasScreenshot();
        
        console.log("A ship ran into another ship!!");
        
        // Set a short timeout so you can see the explosions
        setTimeout(function() 
        {
            game.state.start('GameOver');
        }, 2000);
    },
    
    enemyShip_projectile: function(enemy, projectile)
    {
        // Apply damage
        projectile.applyDamage(enemy);
        
        console.log("An enemy ship ran into another projectile!");
        
        // Increase score if the enemy died
        if(enemy.isDead())
        {
            // Kill enemy and projectile
            enemy.die();
            
            if(projectile.isObstacle)
            {
                projectile.explode();
            }
            else
            {
                projectile.kill();
            }
        
            // Update score
            game.state.states['Game'].updateScore(collisionVars.enemyPoints, false);
        }
    },
    
    playerShip_projectile: function(player, projectile)
    {
        console.log(player);
        
        projectile.applyDamage(player);
        
        console.log("An player ship ran into another projectile!");
        
        game.state.states['Game'].updateStatusBar("health", player.health, player.maxHealth);
        
        if(player.isDead())
        {
            // Kill the player and the projectile
            player.die();
            
            if(projectile.isObstacle)
            {
                projectile.explode();
            }
            else
            {
                projectile.kill();
            }
            
            
            // Take a screenshot of the screen to "fake" a pop-up and pass this to the options state
            game.state.states['GameOver'].canvasImage = gameUtils.getCanvasScreenshot();
            
            // Set a short timeout so you can see the explosions
            setTimeout(function() 
            {
                game.state.start('GameOver');
            }, 2000);
        }
    },
    
    playerShip_powerup: function(player, powerup)
    {
        console.log("An player ship ran into another powerup!");
        
        // Apply powerup
        powerup.applyPowerup(player);
        
        // Kill the powerup
        powerup.kill();
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////