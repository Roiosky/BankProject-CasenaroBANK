-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2024 a las 05:07:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `casenaro_bank`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_costumer` int(11) NOT NULL,
  `costumer_name` varchar(55) NOT NULL,
  `costumer_last_name` varchar(55) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `mail` varchar(55) NOT NULL,
  `passw` varchar(20) NOT NULL,
  `balance` double NOT NULL,
  `product` int(11) NOT NULL,
  `foto` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_costumer`, `costumer_name`, `costumer_last_name`, `phone`, `mail`, `passw`, `balance`, `product`, `foto`) VALUES
(0, '', '', '', '', '', 0, 0, NULL),
(12232520, 'sebastian', 'moreno', '3143746197', 'sebas@email.com', '1234', 0, 0, NULL),
(789456, 'santi', 'marin', '3647889124', 'santi@email.com', '1423', 0, 0, NULL),
(718512, 'camilo', 'acevedo', '3124569874', 'cami@mail.com', '3214', 0, 0, NULL),
(86954123, 'marta', 'vasquez', '6548971234', 'marta@mail.com', '7894', 0, 0, NULL),
(1037643408, 'Raul', 'Cruz', '3242192600', 'cruzalcala@mail.com', 'alcala16*', 1.2251358899899998e21, 0, NULL),
(1037643408, 'Raul', 'Cruz', '3242192600', 'cruzalcala@mail.com', 'alcala16*', 1.2251358899899998e21, 0, NULL),
(1037643410, 'Santiago', 'Bernal', '3242192800', 'bernalsanti@mail.com', 'santiagob18*', 0, 0, NULL),
(1000204885, 'Gerardo', 'Garcia', '3242192551', 'garciag18@mail.com', 'garciag18*', 101000, 0, NULL),
(4973891, 'Glennis', 'Romero', '3112190754', 'romeroyquinua@mail.com', 'romero16*', 400, 0, NULL),
(12439865, 'Shenna', 'Rios', '320573320', 'shennar@mail.com', 'sebitas20*', 100, 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `id` int(11) NOT NULL,
  `id_costumer` varchar(50) DEFAULT NULL,
  `movimiento` varchar(255) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `monto` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movimientos`
--

INSERT INTO `movimientos` (`id`, `id_costumer`, `movimiento`, `fecha`, `monto`) VALUES
(2147483647, '1000204885', 'abono', '2024-06-14 09:29:40', 100000.00),
(2147483647, '1037643408', 'abono', '2024-06-14 09:33:08', 99999999.99),
(2147483647, '1037643408', 'abono', '2024-06-14 09:33:44', 100.00),
(2147483647, '1037643408', 'retiro', '2024-06-14 09:34:08', 99999999.99),
(2147483647, '1037643408', 'retiro', '2024-06-14 09:34:56', 10.00),
(2147483647, '1037643408', 'retiro', '2024-06-14 09:35:09', 99999999.99),
(2147483647, '4973891', 'abono', '2024-06-14 09:38:34', 1200.00),
(2147483647, '4973891', 'retiro', '2024-06-14 09:39:03', 800.00),
(2147483647, '1000204885', 'abono', '2024-06-14 09:51:10', 10000.00),
(2147483647, '1000204885', 'retiro', '2024-06-14 09:51:54', 9000.00),
(2147483647, '12439865', 'abono', '2024-06-14 10:03:24', 100.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_cuenta`
--

CREATE TABLE `tipo_cuenta` (
  `id_tipo_cuenta` int(11) NOT NULL,
  `nombre_tipo` varchar(50) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tipo_cuenta`
--
ALTER TABLE `tipo_cuenta`
  ADD PRIMARY KEY (`id_tipo_cuenta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
