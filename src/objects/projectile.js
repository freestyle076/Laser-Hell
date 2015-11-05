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
* @param {FramesInfo} explosionFramesInfo - Frame information for the explosion object
* @param {FramesInfo} obstacleFramesInfo - [optional] Frame information for the obstacle object
*///=========================================================================================================================
Projectile = function(textureKey, atlasKey, x, y, damage, explosionFramesInfo, obstacleFramesInfo) 
{
    // Set up attributes
    this.textureKey = textureKey;
    this.damage = damage;
    this.isObstacle = obstacleFramesInfo ? true : false;
    
    // Create projectile sprite
    Phaser.Sprite.call(this, game, x, y, atlasKey, textureKey);
    
    // Create death animation
    var deathAnim = this.animations.add
    (
        'dying', 
        Phaser.animation.generateFrameNames(explosionFramesInfo.prefix, explosionFramesInfo.start, explosionFramesInfo.stop, explosionFramesInfo.suffix, explosionFramesInfo.zeroPad),
        60,
        false
    );
    
    // If this animation will dispatch the onUpdate events upon changing frame.
    deathAnim.enableUpdate = true;
    
    // When the projectile is scaled from its default size it won't be automatically 'smoothed' as will retain its pixel crispness
    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    
    // Anchor in the middle
    this.anchor.set(0.5);
    
    // They will check if the projectile is within the world bounds and if not kill it, freeing it up for use in the projectile pool again.
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;
    
    // Tells the projectile to rotate to face the direction it is moving in, as it moves.
    this.tracking = false;
    
    // How fast the projectile should grow in size as it travels
    this.scaleSpeed = 0;
    
    // Initialize based on type
    if(this.isObstacle)
    {
       this.obstacleInit(obstacleFramesInfo); 
    }
    else
    {
        this.bulletInit();
    }
};

/**==========================================================================================================================
* @name BULLET INIT
* 
* @description Bullet constructor
*///=========================================================================================================================
Projectile.prototype.bulletInit = function()
{
    // Nothing here for now
};

/**==========================================================================================================================
* @name OBSTACLE INIT
* 
* @description Obstacle constructor
* 
* @param {FramesInfo} obstacleFramesInfo - Frame information for the obstacle object
*///=========================================================================================================================
Projectile.prototype.obstacleInit = function(obstacleFramesInfo)
{
    // Create floating animation
    var floatingAnim = this.animations.add
    (
        'floating', 
        Phaser.animation.generateFrameNames(obstacleFramesInfo.prefix, obstacleFramesInfo.start, obstacleFramesInfo.stop, obstacleFramesInfo.suffix, obstacleFramesInfo.zeroPad),
        60,
        true
    );
    
    // If this animation will dispatch the onUpdate events upon changing frame.
    floatingAnim.enableUpdate = true;
    
    // Play animation immediately
    this.animations.play('floating');
};

// Inherits from sprite
Projectile.prototype = Object.create(Phaser.Sprite.prototype);

// Specify constructor of projectile
Projectile.prototype.constructor = Projectile;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    this.angle = angle;

    this.body.gravity.set(gx, gy);
};

/**==========================================================================================================================
* @name UPDATE
* 
* @description Update the x and y position of the projectile
*///=========================================================================================================================
Projectile.prototype.update = function () 
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
* @description Explodes or "kills" the projectile by playing the death animation
*///=========================================================================================================================
Projectile.prototype.explode = function()
{
    this.animations.play('dying');
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////