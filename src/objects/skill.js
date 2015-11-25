// ================================================================================================================================
// skill.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// File to hold all skills
// ===============================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BASE SKILL
// --------------------------------------------------------------------------------------------------------------------------

/**==========================================================================================================================
* @name SKILL
* 
* @description Skill constructor
* 
* @param {string} textureKey - The texture atlas key for the projectile
* @param {string} projectileGroupName - Name of the projectile group / pool
* @param {float} damage - Damage that the projectile does
* @param {int} maxProjectiles - The number of projectiles created for this skill pool
* @param {int} bulletSpeed - Speed the projectile travels
* @param {int} fireRate - Rate that the projectile fires
*///=========================================================================================================================
Skill = function(textureKey, projectileGroupName, damage, maxProjectiles, bulletSpeed, fireRate) 
{
    // had to remove parent to get group to construct. was game.world
    // Create a group of these projectiles with Arcade Physics enabled on it
    Phaser.Group.call(this, game, game.world, projectileGroupName, false, true, Phaser.Physics.ARCADE);

    // The time player is allowed to shoot again
    this.nextFire = 0;
    
    // Speed the projectile travels
    this.bulletSpeed = bulletSpeed;
    
    // Rate that the projectile fires
    this.fireRate = fireRate;

    // Create pool of projectiles
    for (var i = 0; i < maxProjectiles; i++)
    {
        this.add(new Projectile(textureKey, "ships-atlas", 0, 0, damage, false), true);
    }

    return this;
};

// Specify constructor of the base skill
Skill.prototype = Object.create(Phaser.Group.prototype);
Skill.prototype.constructor = Skill;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------------------------------------------------------------------------------------------------
// PLAYER PRIMARY SKILL
// --------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name PLAYER PRIMARY SKILL
* 
* @description Player primary skill constructor
* 
* @param {string} textureKey - The texture atlas key for the projectile
* @param {string} projectileGroupName - Name of the projectile group / pool
* @param {float} damage - Damage that the projectile does
* @param {int} maxProjectiles - The number of projectiles created for this skill pool
* @param {int} bulletSpeed - Speed the projectile travels
* @param {int} fireRate - Rate that the projectile fires
*///=========================================================================================================================
PlayerPrimarySkill = function(textureKey, projectileGroupName, damage, maxProjectiles, bulletSpeed, fireRate) 
{
    Skill.call(this, textureKey, projectileGroupName, damage, maxProjectiles, bulletSpeed, fireRate);
};

// Specify constructor of the player's primary skill
PlayerPrimarySkill.prototype = Object.create(Skill.prototype);
PlayerPrimarySkill.prototype.constructor = PlayerPrimarySkill;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name FIRE
* 
* @description Fires the projectiles from the pool of projectiles
* 
* @param {Ship} sourceShip - The ship that is firing
* 
* @returns {bool} - Whether or not the skill was fired.
*///=========================================================================================================================
PlayerPrimarySkill.prototype.fire = function(sourceShip)
{
    // Don't allow it to fire if it's before the cooldown, return did not fire
    if (this.game.time.time < this.nextFire) { return false; }

    // don't allow it to fire if the ship heat is too high ( > 90% )
    if (sourceShip.weaponHeat / sourceShip.maxWeaponHeat > .95) { return false; }

    // Originating x and y for the projectile
    var x = sourceShip.x;
    var y = sourceShip.y - 15;

    // Get next projectile and fire it
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);

    // Update the next time we can fire
    this.nextFire = this.game.time.time + this.fireRate;

    return true;
};

/**==========================================================================================================================
* @name UPGRADE
* 
* @description Upgrade the skill by updating the fire function
*///=========================================================================================================================
PlayerPrimarySkill.prototype.upgrade = function()
{
    // Update function
    PlayerPrimarySkill.prototype.fire = function(sourceShip)
    {
        // Don't allow it to fire if it's before the cooldown
        if(this.game.time.time < this.nextFire) { return false; }

        // don't allow it to fire if the ship heat is too high ( > 90% )
        if (sourceShip.weaponHeat / sourceShip.maxWeaponHeat > .90) { return false; }

        // Originating x and y for the projectile
        var x = sourceShip.x;
        var y = sourceShip.y - 15;

        // Get next few projectiles and fire them around
        this.getFirstExists(false).fire(x, y, 225, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 315, this.bulletSpeed, 0, 0);

        // Update the next time we can fire
        this.nextFire = this.game.time.time + this.fireRate;

        return true;
    };
    
    // Make sure upgrades don't spawn again
    spawningVars.primaryUpgraded = true;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------------------------------------------------------------------------------------------------
// PLAYER SECONDARY SKILL
// --------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name PLAYER SECONDARY SKILL
* 
* @description Player secondary skill constructor
* 
* @param {string} textureKey - The texture atlas key for the projectile
* @param {string} projectileGroupName - Name of the projectile group / pool
* @param {float} damage - Damage that the projectile does
* @param {int} maxProjectiles - The number of projectiles created for this skill pool
* @param {int} bulletSpeed - Speed the projectile travels
* @param {int} fireRate - Rate that the projectile fires
*///=========================================================================================================================
PlayerSecondarySkill = function(textureKey, projectileGroupName, damage, maxProjectiles, bulletSpeed, fireRate) 
{
    Skill.call(this, textureKey, projectileGroupName, damage, maxProjectiles, bulletSpeed, fireRate);
};

// Specify constructor of the player's secondary skill
PlayerSecondarySkill.prototype = Object.create(Skill.prototype);
PlayerSecondarySkill.prototype.constructor = PlayerSecondarySkill;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name FIRE
* 
* @description Fires the projectiles from the pool of projectiles
* 
* @param {Ship} sourceShip - The ship that is firing
* 
* @returns {bool} - Whether or not the skill was fired.
*///=========================================================================================================================
PlayerSecondarySkill.prototype.fire = function(sourceShip)
{
    // Don't allow it to fire if it's before the cooldown
    if(this.game.time.time < this.nextFire) { return false; }

    // Originating x and y for the projectile
    var x = sourceShip.x;
    var y = sourceShip.y - 15;

    // Get next projectile and fire it
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);

    // Update the next time we can fire
    this.nextFire = this.game.time.time + this.fireRate;

    return true;
};

/**==========================================================================================================================
* @name UPGRADE
* 
* @description Upgrade the skill by updating the fire function
*///=========================================================================================================================
PlayerSecondarySkill.prototype.upgrade = function()
{
    // Update function
    PlayerSecondarySkill.prototype.fire = function(sourceShip)
    { 
        // Don't allow it to fire if it's before the cooldown
        if(this.game.time.time < this.nextFire) { return false; }

        // Originating x and y for the projectile
        var x = sourceShip.x;
        var y = sourceShip.y - 15;

        // Get next few projectiles and fire them around
        this.getFirstExists(false).fire(x, y, 225, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 315, this.bulletSpeed, 0, 0);

        // Update the next time we can fire
        this.nextFire = this.game.time.time + this.fireRate;
        
        return true;
    };
    
    // Make sure upgrades don't spawn again
    spawningVars.secondaryUpgraded = true;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------------------------------------------------------------------------------------------------
// DESTROYER SKILL
// --------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name DESTROYER SKILL
* 
* @description Destroyer skill constructor
* 
* @param {string} textureKey - The texture atlas key for the projectile
* @param {string} projectileGroupName - Name of the projectile group / pool
* @param {float} damage - Damage that the projectile does
* @param {int} maxProjectiles - The number of projectiles created for this skill pool
* @param {int} bulletSpeed - Speed the projectile travels
* @param {int} fireRate - Rate that the projectile fires
*///=========================================================================================================================
DestroyerSkill = function(textureKey, projectileGroupName, damage, maxProjectiles, bulletSpeed, fireRate) 
{
    Skill.call(this, textureKey, projectileGroupName, damage, maxProjectiles, bulletSpeed, fireRate);
    
    // Set all of the generated projectiles to scale as time passes
    this.setAll('scaleSpeed', 0.025);
};

// Specify constructor of the destroyer's skill
DestroyerSkill.prototype = Object.create(Skill.prototype);
DestroyerSkill.prototype.constructor = DestroyerSkill;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name FIRE
* 
* @description Fires the projectiles from the pool of projectiles
* 
* @param {Ship} sourceShip - The ship that is firing
* 
* @returns {bool} - Whether or not the skill was fired.
*///=========================================================================================================================
DestroyerSkill.prototype.fire = function(sourceShip)
{
    // Don't allow it to fire if it's before the cooldown
    if(this.game.time.time < this.nextFire) { return false; }

    // Originating x and y for the projectile
    var x = sourceShip.x;
    var y = sourceShip.y + 20;

    // Get next projectile and fire it
    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 0);

    // Update the next time we can fire
    this.nextFire = this.game.time.time + this.fireRate;
    
    return true;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------------------------------------------------------------------------------------------------
// SLASHER SKILL
// --------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name SLASHER SKILL
* 
* @description Slasher skill constructor
* 
* @param {string} textureKey - The texture atlas key for the projectile
* @param {string} projectileGroupName - Name of the projectile group / pool
* @param {float} damage - Damage that the projectile does
* @param {int} maxProjectiles - The number of projectiles created for this skill pool
* @param {int} bulletSpeed - Speed the projectile travels
* @param {int} fireRate - Rate that the projectile fires
*///=========================================================================================================================
SlasherSkill = function(textureKey, projectileGroupName, damage, maxProjectiles, bulletSpeed, fireRate) 
{
    Skill.call(this, textureKey, projectileGroupName, damage, maxProjectiles, bulletSpeed, fireRate);
    
    // Make a pattern for the projectile that will vary the gravity of the projectile in a pattern
    this.pattern = Phaser.ArrayUtils.numberArrayStep(-800, 600, 200);
    this.pattern = this.pattern.concat(Phaser.ArrayUtils.numberArrayStep(800, -600, -200));
    this.patternIndex = 0;
};

// Specify constructor of the slasher's skill
SlasherSkill.prototype = Object.create(Skill.prototype);
SlasherSkill.prototype.constructor = SlasherSkill;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name FIRE
* 
* @description Fires the projectiles from the pool of projectiles
* 
* @param {Ship} sourceShip - The ship that is firing
* 
* @returns {bool} - Whether or not the skill was fired.
*///=========================================================================================================================
SlasherSkill.prototype.fire = function(sourceShip)
{
    // Don't allow it to fire if it's before the cooldown
    if(this.game.time.time < this.nextFire) { return false; }

    // Originating x and y for the projectile
    var x = sourceShip.x;
    var y = sourceShip.y + 20;

    // Get next projectile and fire it, using the pattern for the y gravity of the projectile
    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, this.pattern[this.patternIndex], 0); // currently this gravitates the projectile upwards, kinda cool

    // Move to the next pattern
    this.patternIndex++;

    // Reset if at the end of the pattern
    if (this.patternIndex === this.pattern.length)
    {
        this.patternIndex = 0;
    }

    // Update the next time we can fire
    this.nextFire = this.game.time.time + this.fireRate;

    return true;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------------------------------------------------------------------------------------------------
// TANKER SKILL
// --------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name TANKER SKILL
* 
* @description Tanker skill constructor
* 
* @param {string} textureKey - The texture atlas key for the projectile
* @param {string} projectileGroupName - Name of the projectile group / pool
* @param {float} damage - Damage that the projectile does
* @param {int} maxProjectiles - The number of projectiles created for this skill pool
* @param {int} bulletSpeed - Speed the projectile travels
* @param {int} fireRate - Rate that the projectile fires
*///=========================================================================================================================
TankerSkill = function(textureKey, projectileGroupName, damage, maxProjectiles, bulletSpeed, fireRate) 
{
    Skill.call(this, textureKey, projectileGroupName, damage, maxProjectiles, bulletSpeed, fireRate);
};

// Specify constructor of the tanker's skill
TankerSkill.prototype = Object.create(Skill.prototype);
TankerSkill.prototype.constructor = TankerSkill;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**==========================================================================================================================
* @name FIRE
* 
* @description Fires the projectiles from the pool of projectiles
* 
* @param {Ship} sourceShip - The ship that is firing
*
* @returns {bool} - Whether or not the skill was fired.
*///=========================================================================================================================
TankerSkill.prototype.fire = function(sourceShip)
{
    // Don't allow it to fire if it's before the cooldown
    if(this.game.time.time < this.nextFire) { return false; }

    // Originating x and y for the projectile
    var x = sourceShip.x;
    var y = sourceShip.y + 20;

    // Get next projectile and fire it
    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 8000);

    // Update the next time we can fire
    this.nextFire = this.game.time.time + this.fireRate;

    return true;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////