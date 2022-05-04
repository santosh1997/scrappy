-- -------------------------------------------------------------------------------------------
-- Schemas -----------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------
DROP DATABASE `spy_dev`;

CREATE DATABASE `spy_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `spy_dev`;

-- -------------------------------------------------------------------------------------------
-- Tables ------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------

CREATE TABLE `spy_dev`.`User` (
  `Id` char(36) NOT NULL DEFAULT (UUID()),
  `Name` mediumtext NOT NULL,
  `Email` varchar(320) NOT NULL,
  `Password` mediumtext NOT NULL,
  `CreatedBy` char(36) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT (utc_timestamp()),
  `ModifiedBy` char(36) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT (utc_timestamp()),
  PRIMARY KEY (`Email`),
  UNIQUE KEY `uk_User_Id` (`Id`),
  CONSTRAINT `fk_user_id_user_createdby_id` FOREIGN KEY (`CreatedBy`) REFERENCES `User` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_id_user_modifiedby_id` FOREIGN KEY (`ModifiedBy`) REFERENCES `User` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `spy_dev`.`UserSession` (
  `Id` char(36) NOT NULL,
  `UserId` char(36) NOT NULL,
  `LoggedInOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LoggedOutOn` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_UserSession_UserId_User_Id` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `spy_dev`.`ScrapableLink` (
  `Id` char(36) NOT NULL DEFAULT (UUID()),
  `Link` text NOT NULL,
  `CreatedBy` char(36) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT (utc_timestamp()),
  `ProcessId` char(36) DEFAULT NULL,
  `ProcessStartedOn` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `uk_scrapablelink_process_id` (`ProcessId`),
  CONSTRAINT `fk_user_id_scrapablelink_createdby_id` FOREIGN KEY (`CreatedBy`) REFERENCES `User` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `spy_dev`.`ScrapedAssets` (
  `Id` char(36) NOT NULL DEFAULT (UUID()),
  `AssetLink` text NOT NULL,
  `LinkId` char(36) NOT NULL,
  `ScrapedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Type` int NOT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_ScrapedAssets_LinkId_ScrapableLink_Id` FOREIGN KEY (`LinkId`) REFERENCES `ScrapableLink` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- -------------------------------------------------------------------------------------------
-- Procs -------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------


DROP PROCEDURE IF EXISTS `spy_dev`.`udsp_UserSession_Create`;

DELIMITER $$
CREATE PROCEDURE `spy_dev`.`udsp_UserSession_Create`(
 	var_EmailAddress varchar(320),
	var_Password mediumtext
)
BEGIN
	DECLARE error_AccessDenied CONDITION FOR SQLSTATE '28000'; 
	DECLARE var_SessionId VARCHAR(36);
	DECLARE var_UserId VARCHAR(36);
 	
	SET var_EmailAddress = TRIM(IFNULL(var_EmailAddress, ''));
 	SET var_Password = TRIM(IFNULL(var_Password, ''));
 	
 	IF(NOT(var_EmailAddress = '' OR var_Password = '')) THEN
		SELECT Id into var_UserId FROM User 
 	 	WHERE `Email`= var_EmailAddress 
 	 	AND `Password`= SHA2(var_Password, 256);
 	END IF;
 	
 	SET var_UserId = TRIM(IFNULL(var_UserId, ''));
 	
 	IF(var_UserId = '') THEN
		SIGNAL error_AccessDenied
		SET MESSAGE_TEXT = 'User does not exists', MYSQL_ERRNO = 1045;
	END IF;
 	
	SET var_SessionId = UUID();
	
	UPDATE `UserSession` SET `LoggedOutOn`= CURRENT_TIMESTAMP
	WHERE `UserId` = var_UserId;

	INSERT INTO `UserSession`
	(`Id`, `UserId`)
	VALUES
	(var_SessionId, var_UserId);
 	
 	SELECT var_SessionId AS SessionId, var_UserId AS UserId;
END $$
DELIMITER ;



DROP PROCEDURE IF EXISTS `spy_dev`.`udsp_Scrap_Init`;

DELIMITER $$
CREATE PROCEDURE `spy_dev`.`udsp_Scrap_Init`()
BEGIN 
	DECLARE var_ProcessId VARCHAR(36);

	SET var_ProcessId = UUID();
	
	UPDATE `ScrapableLink` SET `ProcessStartedOn`= CURRENT_TIMESTAMP, `ProcessId` = var_ProcessId
	WHERE `ProcessId` IS NULL
  ORDER BY `CreatedOn` LIMIT 1;
 	
 	SELECT `Id`, `ProcessId`, `Link`  FROM `ScrapableLink` WHERE `ProcessId` = var_ProcessId;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS `spy_dev`.`udsp_ScrappedAsset_Retrieve`;

DELIMITER $$
CREATE PROCEDURE `spy_dev`.`udsp_ScrappedAsset_Retrieve`(
  var_Type int,
  var_Offset int,
  var_Size int
)
BEGIN 

	SET var_Type = IFNULL(var_Type, -1);
	SET var_Offset = IFNULL(var_Offset, 0);
	SET var_Size = IFNULL(var_Size, 10);
 	
 	SELECT `AssetLink`, `LinkId`, `Type` FROM `ScrapedAssets`
  WHERE (var_Type = -1 OR `Type` = var_Type)
  ORDER BY `ScrapedOn` DESC
  LIMIT var_Size OFFSET var_Offset;

  SELECT COUNT(*) AS `Count` FROM `ScrapedAssets`;

END $$
DELIMITER ;

-- -------------------------------------------------------------------------------------------
-- Seed Data ---------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------


INSERT INTO `spy_dev`.`User`
(`Id`, `Name`, `Email`, `Password`)
VALUES
(UUID(), "System User", "system@spy.com", SHA2("san", 256));


