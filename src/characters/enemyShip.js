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
EnemyShip = function (game, x, y, mainSprite, explosionFrames, maxHealth, speed, skills, group)
{
    Ship.call(this, game, x, y, mainSprite, explosionFrames, maxHealth, speed, skills, group);

    // boundary values for enemy ship flight space
    // top and right are 0
    this.bottomBoundary = game.height * .3;
    this.rightBoundary = game.width;

    // start direction
    this.currentDirection = gameUtils.getStartDirection();

    this.exists = false;
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
    EnemyShip.prototype.act = function ()
    {
        
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
    var damage = 60;
    var maxProjectiles = 50;
    var bulletSpeed = 250;
    var fireRate = 3000;
    var explosionFrames = new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4);
    var destroyerSkill = new DestroyerSkill(
        "med_ball_blue_laser",
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
    this.scale.setTo(0.5, 0.5);
}
Destroyer.prototype = Object.create(EnemyShip.prototype);
Destroyer.prototype.constructor = Destroyer;

    /**==========================================================================================================================
    * @name ACT
    *  
    * @description determines how the enemy ship should act and performs the action
    *///=========================================================================================================================
    Destroyer.prototype.act = function ()
    {
        // choose hover height at construction
        // hover in a manner that gravitates towards player

        //this.move(false, false, true, false);
        this.skills[0].fire(this);
    }

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
    var damage = 10;
    var maxProjectiles = 50;
    var bulletSpeed = 500;
    var fireRate = 300;
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

    /**==========================================================================================================================
    * @name ACT
    *  
    * @description determines how the enemy ship should act and performs the action
    *///=========================================================================================================================
    Slasher.prototype.act = function ()
    {
        // move in jagged pattern upright,upleft,downright,downleft 
        // choosing horizontal directions towards the player

        //this.move(false, false, true, false);
        this.skills[0].fire(this);
    }

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
    var damage = 30;
    var maxProjectiles = 50;
    var bulletSpeed = 1;
    var fireRate = 1500;
    var explosionFrames = new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4);
    var tankerSkill = new TankerSkill(
        "large_pink_laser",
        "tankerProjectiles",
        damage,
        maxProjectiles,
        bulletSpeed,
        fireRate,
        explosionFrames
    );

    // call super constructor
    EnemyShip.call(this, game, x, y, mainSprite, maxHealth, speed, [tankerSkill], group);
    this.scale.setTo(0.7, 0.7);
}
Tanker.prototype = Object.create(EnemyShip.prototype);
Tanker.prototype.constructor = Tanker;

    /**==========================================================================================================================
    * @name ACT
    *  
    * @description determines how the enemy ship should act and performs the action
    *///=========================================================================================================================
    Tanker.prototype.act = function ()
    {

        // post up for a while
        // after timer done select new position within radius and within bounds
        // move to that position
        // timer must be long enough to allow ship to travel and chill


        //this.move(false, false, true, false);
        this.skills[0].fire(this);
    }