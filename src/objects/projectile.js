// ================================================================================================================================
// projectile.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Base class for projectiles, extends Phaser.Sprite.
// This may include bullets, lasers, and rockets.
// ===============================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------

/**==========================================================================================================================
* @name PROJECTILE
* 
* @description Projectile constructor
* 
* @param {string} textureKey - The texture atlas key for the projectile.
* @param {string} atlasKey - The atlas key for the texture atlas key
* @param {float} x - x position of the projectile to spawn
* @param {float} y - y position of the projectile to spawn
* @param {float} damage - Damage that the projectile does
* @param {bool} isObstacle- Whether or not it's an obstacle
*///=========================================================================================================================
Projectile = function(textureKey, atlasKey, x, y, damage, isObstacle) 
{
    // Set up attributes
    this.textureKey = textureKey;
    this.damage = damage;
    this.isObstacle = isObstacle;
    
    // Create projectile sprite
    Phaser.Sprite.call(this, game, x, y, atlasKey, textureKey);
    
    // When the projectile is scaled from its default size it won't be automatically 'smoothed' as will retain its pixel crispness
    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    
    // Anchor in the middle
    this.anchor.set(0.5);
    
    // Fires on out of bounds events so we can kill it when it's out of bounds, freeing it up for use in the projectile pool again.
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(Projectile.prototype.onProjectileOut, game.state.states['Game']);
    this.exists = false;
    
    // Tells the projectile to rotate to face the direction it is moving in, as it moves.
    this.tracking = false;
    
    // How fast the projectile should grow in size as it travels
    this.scaleSpeed = 0;
};

// Inherits from sprite
Projectile.prototype = Object.create(Phaser.Sprite.prototype);

// Specify constructor of projectile
Projectile.prototype.constructor = Projectile;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name ON PROJECTILE OUT
* 
* @description Kills the projectile if it goes left, right, or below the game bounds
*///=========================================================================================================================
Projectile.prototype.onProjectileOut = function(projectile)
{
    // Kill if it is truly out of bounds (spawns above)
    if (projectile.body.x > game.width + 200 || projectile.body.x < -200 || projectile.body.y > game.height + 200 || projectile.body.y < -200)
    {
        projectile.kill();
    }
};

/**==========================================================================================================================
* @name FIRE
* 
* @description Applies damage to the specified ship by using its takeDamage() function.
* 
* @param {float} x - x position of the projectile
* @param {float} y - y position of the projectile
* @param {float} angle - Angle of the projectile
* @param {float} speed - Speed of the projectile
* @param {float} gx - Gravity of the projectile in the x direction
* @param {float} gy - Gravity of the projectile in the y direction
*///=========================================================================================================================
Projectile.prototype.fire = function(x, y, angle, speed, gx, gy)
{
    gx = gx || 0;
    gy = gy || 0;
    
    this.reset(x, y);

    this.scale.set(1);
    
    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle + 90;

    this.body.gravity.set(gx, gy);
};

/**==========================================================================================================================
* @name UPDATE
* 
* @description Update the x and y position of the projectile
*///=========================================================================================================================
Projectile.prototype.update = function() 
{
    if (this.tracking)
    {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0)
    {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }
    
    if(this.isObstacle)
    {
        this.angle += 1;
    }
};

/**==========================================================================================================================
* @name APPLY DAMAGE
* 
* @description Applies damage to the specified ship by using its takeDamage() function.
* 
* @param {Ship} damagedShip - The ship we want to damage
*///=========================================================================================================================
Projectile.prototype.applyDamage = function(damagedShip)
{
    damagedShip.takeDamage(this.damage);
};

/**==========================================================================================================================
* @name EXPLODE
* 
* @description Kills the projectile
*///=========================================================================================================================
Projectile.prototype.die = function()
{    
    // Kill projectile
    this.kill();
    
    // Create an explosion if it's an obstacle
    if(this.isObstacle)
    {
        var explosion = spawningGroups.explosions.getFirstExists(false);
        explosion.reset(this.body.x, this.body.y);
        explosion.play('kaboom', 30, false, true);
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////