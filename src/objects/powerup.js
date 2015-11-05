// ================================================================================================================================
// powerup.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Base class for powerups, extends Phaser.Sprite
// ===============================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------------------------------------------------------------------------------------------------
// BASE POWERUP
// --------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------

/**==========================================================================================================================
* @name POWERUP
* 
* @description Projectile constructor
* 
* @param {string} textureKey - The texture atlas key for the projectile
* @param {float} x - x position of the projectile to spawn
* @param {float} y - y position of the projectile to spawn
*///=========================================================================================================================
Powerup = function(textureKey, x, y) 
{
    // Set up attributes
    this.textureKey = textureKey;
    
    // Create powerup sprite
    Phaser.Sprite.call(this, game, x, y, 'pickups-atlas', textureKey);
};

// Inherits from sprite
Powerup.prototype = Object.create(Phaser.Sprite.prototype);

// Specify constructor of powerup
Powerup.prototype.constructor = Powerup;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------------------------------------------------------------------------------------------------
// HEALTH POWERUP
// --------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name HEALTH POWERUP
* 
* @description Health powerup constructor
* 
* @param {string} textureKey - The texture atlas key for the projectile
* @param {float} x - x position of the projectile to spawn
* @param {float} y - y position of the projectile to spawn
* @param {float} health - Amount to heal the ship that collects the powerup
*///=========================================================================================================================
HealthPowerup = function(textureKey, x, y, health)
{
    Powerup.call(this, textureKey, x, y);
    
    this.health = health;
};

// Specify constructor for health powerup
HealthPowerup.prototype.constructor = HealthPowerup;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name APPLY POWERUP
* 
* @description Heals the ship that collected the powerup
* 
* @param {Ship} sourceShip - Ship that collected the powerup
*///=========================================================================================================================
HealthPowerup.applyPowerup = function(sourceShip)
{
    sourceShip.heal(this.health);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------------------------------------------------------------------------------------------------
// COOLDOWN POWERUP
// --------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name COOLDOWN POWERUP
* 
* @description Cooldown powerup constructor
* 
* @param {string} textureKey - The texture atlas key for the projectile
* @param {float} x - x position of the projectile to spawn
* @param {float} y - y position of the projectile to spawn
* @param {float} cooldown - Amount to cooldown the weaponheat of the ship that collects the powerup
*///=========================================================================================================================
CooldownPowerup = function(textureKey, x, y, cooldown)
{
    Powerup.call(this, textureKey, x, y);
    
    this.cooldown = cooldown;
};

// Specify constructor for cooldown powerup
CooldownPowerup.prototype.constructor = CooldownPowerup;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name APPLY POWERUP
* 
* @description Lowers the heat of the weapon from the ship that collected the powerup
* 
* @param {Ship} sourceShip - Ship that collected the powerup
*///=========================================================================================================================
CooldownPowerup.applyPowerup = function(sourceShip)
{
    sourceShip.heat(-this.cooldown);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------------------------------------------------------------------------------------------------
// UPGRADE POWERUP
// --------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name UPGRADE POWERUP
* 
* @description Upgrade powerup constructor
* 
* @param {string} textureKey - The texture atlas key for the projectile
* @param {float} x - x position of the projectile to spawn
* @param {float} y - y position of the projectile to spawn
* @param {int} skillIndex - Index of the skill to upgrade of the ship that collected the powerup
*///=========================================================================================================================
UpgradePowerup = function(textureKey, x, y, skillIndex)
{
    Powerup.call(this, textureKey, x, y);
    
    this.skillIndex = skillIndex;
};

// Specify constructor for upgrade powerup
UpgradePowerup.prototype.constructor = UpgradePowerup;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name APPLY POWERUP
* 
* @description Upgrades the skill attached to the ship with this skillIndex
* 
* @param {Ship} sourceShip - Ship that collected the powerup
*///=========================================================================================================================
UpgradePowerup.applyPowerup = function(sourceShip)
{
    if(this.skillIndex < sourceShip.skills.length)
    {
        sourceShip.skills[this.skillIndex].upgrade();
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////