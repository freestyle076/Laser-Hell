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
        // movement variables
        var down = false;
        var up = false;
        var right = false;
        var left = false;

        // horizontal movement decision
        // 0: none; 1: left; 2: right;
        var horizontalDecision = this.horizontalMovement();

        // decode horizontal decision return
        switch (horizontalDecision)
        {
            case 1: left = true; break;
            case 2: right = true; break;
        }

        // vertical movement decision
        // 0: none; 1: up; 2: down;
        var verticalDecision = this.verticalMovement();

        // decode vertical decision return
        switch (verticalDecision)
        {
            case 1: up = true; break;
            case 2: down = true; break;
        }

        // move according to horizontal/vertical decisions
        this.move(up, right, down, left);

        // fire if decided to fire
        if (this.shouldFire()) this.skills[0].fire(this);

    };

    /**==========================================================================================================================
    * @name HORIZONTAL MOVEMENT
    *  
    * @description ABSTRACT determines which horizontal movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for left, 2 for right
    *///=========================================================================================================================
    EnemyShip.prototype.horizontalMovement = function () { };

    /**==========================================================================================================================
    * @name VERTICAL MOVEMENT
    *  
    * @description ABSTRACT determines which vertical movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for up, 2 for down
    *///=========================================================================================================================
    EnemyShip.prototype.verticalMovement = function () { };

    /**==========================================================================================================================
    * @name SHOULD FIRE
    *  
    * @description ABSTRACT determines if the ship should fire, does not consider if the ship CAN fire
    *
    * @returns {bool} - true if should fire, false otherwise
    *///=========================================================================================================================
    EnemyShip.prototype.shouldFire = function () { };

    /**==========================================================================================================================
    * @name PLAYER IS TO LEFT
    *  
    * @description determines if the player ship's x position is less than this ship's x position
    *
    * @returns {bool} - true if player ship is to left of enemy ship, false otherwise
    *///=========================================================================================================================
    EnemyShip.prototype.playerIsToLeft = function ()
    {
        // player ship's x position
        var playerX = game.state.states['Game'].playerShip.x;
        
        // return whether player x is less than this ship's x
        return (playerX < this.x);
    };


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

    // yHover variable, ship's vertical hover position
    this.yHover = Math.random() * this.bottomBoundary; 
    this.goingRight = false; //horizontal direction tracker

    // firing range, the max difference between player ship x and destroyer x for deciding to fire
    this.firingRange = 10;

    // scale destroyer sprite
    this.scale.setTo(0.5, 0.5);
}
Destroyer.prototype = Object.create(EnemyShip.prototype);
Destroyer.prototype.constructor = Destroyer;


    /**==========================================================================================================================
    * @name HORIZONTAL MOVEMENT
    *  
    * @description OVERRIDE determines which horizontal movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for left, 2 for right
    *///=========================================================================================================================
    Destroyer.prototype.horizontalMovement = function ()
    {
        // default to going right
        this.goingRight = false;

        // seek the player
        if (this.playerIsToLeft()) return 1;

        else
        {
            this.goingRight = true;
            return 2;
        }
    };

    /**==========================================================================================================================
    * @name VERTICAL MOVEMENT
    *  
    * @description OVERRIDE determines which vertical movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for up, 2 for down
    *///=========================================================================================================================
    Destroyer.prototype.verticalMovement = function ()
    {
        // if lower than yHover go up
        if (this.y > this.yHover) return 1;

        // else if higher than yHover go down
        else if (this.y < this.yHover) return 2;

        // else stay put
        else return 0;
    };

    /**==========================================================================================================================
    * @name SHOULD FIRE
    *  
    * @description determines if the ship should fire, does not consider if the ship CAN fire
    *
    * @returns {bool} - true if should fire, false otherwise
    *///=========================================================================================================================
    Destroyer.prototype.shouldFire = function ()
    {
        // player's X position
        var playerX = game.state.states['Game'].playerShip.x;

        // return true if x difference is within firingRange
        if (Math.abs(playerX - this.x) <= this.firingRange) return true;

        // else return false
        else return false;
    };

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
    var fireRate = 3000;
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
    * @name HORIZONTAL MOVEMENT
    *  
    * @description OVERRIDE determines which horizontal movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for left, 2 for right
    *///=========================================================================================================================
    Slasher.prototype.horizontalMovement = function ()
    {
        return 0;
    };

    /**==========================================================================================================================
    * @name VERTICAL MOVEMENT
    *  
    * @description OVERRIDE determines which vertical movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for up, 2 for down
    *///=========================================================================================================================
    Slasher.prototype.verticalMovement = function ()
    {
        return 0;
    };

    /**==========================================================================================================================
    * @name SHOULD FIRE
    *  
    * @description determines if the ship should fire, does not consider if the ship CAN fire
    *
    * @returns {bool} - true if should fire, false otherwise
    *///=========================================================================================================================
    Slasher.prototype.shouldFire = function ()
    {
        return true;
    };

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