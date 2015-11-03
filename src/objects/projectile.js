// ================================================================================================================================
// projectile.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Base class for projectiles, extends Phaser.Sprite
// ===============================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------

/**==========================================================================================================================
* @name PROJECTILE
* 
* @description Projectile constructor
* 
* @param {string} textureKey - The texture atlas key for the projectile
* @param {float} x - x position of the projectile to spawn
* @param {float} y - y position of the projectile to spawn
* @param {float} damage - Damage that the projectile does
* @param {bool} isObstacle - Whether or not the projectile is an obstacle
* @param {FramesInfo} explosionFramesInfo - Frame information for the explosion object
*///=========================================================================================================================
Projectile = function(textureKey, x, y, damage, isObstacle, explosionFramesInfo) 
{
    // Set up attributes
    this.textureKey = textureKey;
    this.damage = damage;
    this.isObstacle = isObstacle;
    this.explosionFramesInfo = explosionFramesInfo;
    
    // Create projectile sprite
    Phaser.Sprite.call(this, game, x, y, 'ships-and-projectiles-atlas', textureKey);
    
    // Create death animation
    var deathAnim = this.animations.add
    (
        'dying', 
        Phaser.animation.generateFrameNames(this.explosionFramesInfo.prefix, this.explosionFramesInfo.start, this.explosionFramesInfo.stop, this.explosionFramesInfo.suffix, this.explosionFramesInfo.zeroPad),
        30,
        false
    );
    
    // If this animation will dispatch the onUpdate events upon changing frame.
    deathAnim.enableUpdate = true;
    // Should the parent of this Animation be killed when the animation completes?
    deathAnim.killOnComplete  = true;
};

// Inherits from sprite
Projectile.prototype = Object.create(Phaser.Sprite.prototype);

// Specify constructor of projectile
Projectile.prototype.constructor = Projectile;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name EXPLODE
* 
* @description Explodes or "kills" the projectile by playing the death animation
*///=========================================================================================================================
Projectile.prototype.explode = function()
{
    this.animations.play('dying');
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////