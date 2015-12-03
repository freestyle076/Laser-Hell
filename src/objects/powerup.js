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
* @param {string} atlasKey - The atlas key for the texture atlas key
* @param {float} x - x position of the projectile to spawn
* @param {float} y - y position of the projectile to spawn
*///=========================================================================================================================
Powerup = function(textureKey, atlasKey, x, y) 
{
    // Create projectile sprite
    Projectile.call(this, textureKey, atlasKey, x, y, 0, false, true);
};

// Inherits from projectile
Powerup.prototype = Object.create(Projectile.prototype);

// Specify constructor of projectile
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
HealthPowerup = function(x, y, health)
{
    Powerup.call(this, 'health_powerup', 'powerups-atlas', x, y);
    
    this.healthAmount = health;
};

// Inherits from powerup
HealthPowerup.prototype = Object.create(Powerup.prototype);

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
HealthPowerup.prototype.applyPowerup = function(sourceShip)
{
    sourceShip.heal(this.healthAmount);

    // Update health bar of player
    game.state.states['Game'].updateStatusBar('health', sourceShip.shipHealth, sourceShip.maxHealth);
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
CooldownPowerup = function(x, y, cooldown)
{
    Powerup.call(this, 'coolant_powerup', 'powerups-atlas', x, y);
    
    this.cooldown = cooldown;
};

// Inherits from powerup
CooldownPowerup.prototype = Object.create(Powerup.prototype);

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
CooldownPowerup.prototype.applyPowerup = function(sourceShip)
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
UpgradePowerup = function(x, y, skillIndex)
{
    switch(skillIndex)
    {
        case 0: Powerup.call(this, 'primary_upgrade_powerup', 'powerups-atlas', x, y); break;
        case 1: Powerup.call(this, 'secondary_upgrade_powerup', 'powerups-atlas', x, y); break;
        default: break;
    }

    this.skillIndex = skillIndex;
};

// Inherits from powerup
UpgradePowerup.prototype = Object.create(Powerup.prototype);

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
UpgradePowerup.prototype.applyPowerup = function(sourceShip)
{
    if(this.skillIndex < sourceShip.skills.length)
    {
        sourceShip.skills[this.skillIndex].upgrade();
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////