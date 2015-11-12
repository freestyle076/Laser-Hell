// ================================================================================================================================
// enemyShip.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// EnemyShip class extension and EnemyShip subclasses: Destroyer, Slasher, Tanker
// ===============================================================================================================================

// ENEMY SHIP
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------

/**==========================================================================================================================
* @param {Phaser.Game} game - game that sprite will be added to
* @param {float} x - horizontal (x) location of sprite
* @param {float} y - vertifcal (y) location of sprite
* @param {string} mainSprite - key for ship sprite image
* @param {string[]} explosionFrames - string of explosion frames
* @param {float} maxHealth - maximum and starting health for ship
* @param {float} speed - movement speed
* @param {Skill[]} skills - list of skill objects for ship
* @param {Phaser.Group} group - physics group to add ship to
*
* @description EnemyShip constructor does not need to be overriden
*///=========================================================================================================================
EnemyShip = function(game, x, y, mainSprite, explosionFrames, maxHealth, skills, group) {
    Ship.call(this, game, x, y, mainSprite, explosionFrames, maxHealth, skills, group);
}

EnemyShip.prototype = Object.create(Ship.prototype);
EnemyShip.prototype.constructor = EnemyShip;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // ENEMY SHIP FUNCTIONS
    // --------------------------------------------------------------------------------------------------------------------------

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**==========================================================================================================================
    * @name ACT
    *  
    * @description ABSTRACT performs the enemies behavior
    *///=========================================================================================================================
    EnemyShip.prototype.act = function () {
        //override
    };
    EnemyShip.prototype.destroyerHealth = 75;
    EnemyShip.prototype.tankerHealth = 250;
    EnemyShip.prototype.slasherHealth = 100;


// DESTROYER
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CONSTRUCTOR
    // --------------------------------------------------------------------------------------------------------------------------

    /**=========================================================================================================================
    * @param {Phaser.Game} game - game that sprite will be added to
    * @param {float} x - horizontal (x) location of sprite
    * @param {float} y - vertifcal (y) location of sprite
    * @param {Phaser.Group} group - physics group to add ship to
    *
    * @description Destroyer constructor
    *///=========================================================================================================================

    Destroyer = function (game, x, y, group)
    {
        // visible parameters
        var mainSprite = 'red_ship_03';
        var maxHealth = 50;
        var speed = 2;

        // destroyer ship skill
        var damage = 40;
        var maxProjectiles = 50;
        var bulletSpeed = 4;
        var fireRate = 10;
        var explosionFrames = new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4);
        var destroyerSkill = new DestroyerSkill(
            "large_red_laser",
            "destroyerProjectiles",
            damage,
            maxProjectiles,
            bulletSpeed,
            fireRate,
            explosionFrames
        );

        // call super class constructor
        EnemyShip.call(this, game, x, y, mainSprite, maxHealth, speed, [destroyerSkill], group);

        // scale destroyer sprite
        this.scale.setTo(0.4, 0.4);
    }
    Destroyer.prototype = Object.create(EnemyShip.prototype);
    Destroyer.prototype.constructor = Destroyer;


// SLASHER
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CONSTRUCTOR
    // --------------------------------------------------------------------------------------------------------------------------

    /**=========================================================================================================================
    * @param {Phaser.Game} game - game that sprite will be added to
    * @param {float} x - horizontal (x) location of sprite
    * @param {float} y - vertifcal (y) location of sprite
    * @param {Skill[]} skills - list of skill objects for ship
    * @param {Phaser.Group} group - physics group to add ship to
    *
    * @description Slasher constructor
    *///=========================================================================================================================
    Slasher = function (game, x, y, skills, group)
    {
        // visible parameters
        var mainSprite = 'red_ship_02';
        var maxHealth = 20;
        var speed = 10;

        // slasher ship skill
        var damage = 40;
        var maxProjectiles = 50;
        var bulletSpeed = 4;
        var fireRate = 10;
        var explosionFrames = new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4);
        var slasherSkill = new SlasherSkill(
            "green_laser_01",
            "slasherProjectiles",
            damage,
            maxProjectiles,
            bulletSpeed,
            fireRate,
            explosionFrames
        );

        // call superclass constructor
        EnemyShip.call(this, game, x, y, mainSprite, maxHealth, speed, [slasherSkill], group);

        // scale slasher sprite
        this.scale.setTo(0.4, 0.4);
    }
    Slasher.prototype = Object.create(EnemyShip.prototype);
    Slasher.prototype.constructor = Slasher;

// TANKER
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CONSTRUCTOR
    // --------------------------------------------------------------------------------------------------------------------------

    /**=========================================================================================================================
    * @param {Phaser.Game} game - game that sprite will be added to
    * @param {float} x - horizontal (x) location of sprite
    * @param {float} y - vertifcal (y) location of sprite
    * @param {Skill[]} skills - list of skill objects for ship
    * @param {Phaser.Group} group - physics group to add ship to
    *
    * @description Tanker constructor
    *///=========================================================================================================================
    Tanker = function (game, x, y, skills, group)
    {
        // visible parameters
        var mainSprite = 'red_ship_01';
        var maxHealth = 100;
        var speed = 5;

        // tanker ship skill
        var damage = 40;
        var maxProjectiles = 50;
        var bulletSpeed = 4;
        var fireRate = 10;
        var explosionFrames = new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4);
        var tankerSkill = new TankerSkill(
            "pink_laser_03",
            "tankerProjectiles",
            damage,
            maxProjectiles,
            bulletSpeed,
            fireRate,
            explosionFrames
        );

        // call super constructor
        EnemyShip.call(this, game, x, y, mainSprite, maxHealth, speed, [tankerSkill], group);
        this.scale.setTo(0.4, 0.4);
    }
    Tanker.prototype = Object.create(EnemyShip.prototype);
    Tanker.prototype.constructor = Tanker;