-- --------------------------------------------------------
-- Host:                         192.168.1.420
-- Versión del servidor:         10.3.27-MariaDB-0+deb10u1 - Raspbian 10
-- SO del servidor:              debian-linux-gnueabihf
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para despensa
CREATE DATABASE IF NOT EXISTS `despensa` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `despensa`;

-- Volcando estructura para tabla despensa.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla despensa.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `nombre` varchar(50) NOT NULL,
  `cantidad` decimal(3,1) DEFAULT NULL,
  `categoria` varchar(20) NOT NULL,
  `minimo` decimal(3,1) DEFAULT NULL,
  PRIMARY KEY (`nombre`),
  KEY `categoria` (`categoria`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
