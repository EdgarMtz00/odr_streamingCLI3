-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2019 a las 16:57:46
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `odr`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amigos`
--

CREATE TABLE `amigos` (
  `idAmistad` int(11) NOT NULL,
  `IdUsuario` varchar(30) NOT NULL,
  `IdUsuario2` varchar(30) NOT NULL,
  `idChat` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoriaforo`
--

CREATE TABLE `categoriaforo` (
  `IdCategoriaForo` int(11) NOT NULL,
  `NombreCategoria` varchar(30) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `URLCategoria` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categoriaforo`
--

INSERT INTO `categoriaforo` (`IdCategoriaForo`, `NombreCategoria`, `Descripcion`, `URLCategoria`) VALUES
(1, 'Categoria 1', 'Esto es una prueba de las categorias', 'categoria-1'),
(2, 'Categoria 2', 'Esto es la segunda prueba de las categorias', 'categoria-2'),
(3, 'Categoria 3', 'Esto es una tercera prueba de las categorias', 'categoria-3'),
(4, 'Categoria 4', 'Esto es una 4ta prueba de las categorias', 'categoria-4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `IdCategoria` tinyint(4) NOT NULL,
  `idTipo` tinyint(4) NOT NULL,
  `NombreCategoria` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`IdCategoria`, `idTipo`, `NombreCategoria`) VALUES
(1, 1, 'Manga'),
(3, 1, 'Comic'),
(4, 2, 'Anime'),
(5, 3, 'Musica'),
(7, 1, 'Revista'),
(9, 2, 'Pelicula'),
(10, 1, 'Libro'),
(12, 2, 'Serie');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contadordeusuario`
--

CREATE TABLE `contadordeusuario` (
  `IdContador` int(11) NOT NULL,
  `NumeroPosts` int(11) NOT NULL,
  `Reputacion` tinyint(3) NOT NULL,
  `ImagenesPublicadas` int(11) NOT NULL,
  `ContadorLogros` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenido`
--

CREATE TABLE `contenido` (
  `IdContenido` int(11) NOT NULL,
  `IdHolder` int(11) NOT NULL,
  `TituloContenido` varchar(50) NOT NULL,
  `URLContenido` varchar(60) NOT NULL,
  `NumeroElemento` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `contenido`
--

INSERT INTO `contenido` (`IdContenido`, `IdHolder`, `TituloContenido`, `URLContenido`, `NumeroElemento`) VALUES
(1, 7, 'adsf', 'adsf', 1),
(2, 7, 'lkjghjkghkj', 'lkjghjkghkj', 1),
(3, 8, 'jjjjjj', 'jjjjjj', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `emoticon`
--

CREATE TABLE `emoticon` (
  `IdEmoticon` smallint(6) NOT NULL,
  `NombreDeEmoticon` varchar(15) NOT NULL,
  `Precio` smallint(6) NOT NULL,
  `IdSaga` int(11) NOT NULL,
  `Thumbnail` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `emoticon`
--

INSERT INTO `emoticon` (`IdEmoticon`, `NombreDeEmoticon`, `Precio`, `IdSaga`, `Thumbnail`) VALUES
(1, '1234124', 150, 4, ''),
(2, '1234124', 150, 4, '');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `getamigos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `getamigos` (
`idUsuario` varchar(30)
,`IdAmigo` varchar(30)
,`idChat` varchar(30)
,`Nickname` varchar(20)
,`Imagen` varchar(200)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `getcategoriastype`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `getcategoriastype` (
`Idcategoria` tinyint(4)
,`IdTipo` tinyint(4)
,`NombreCategoria` varchar(15)
,`TipoContenido` varchar(10)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `getcontentdata`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `getcontentdata` (
`IdHolder` int(11)
,`TituloContenido` varchar(50)
,`URLContenido` varchar(60)
,`NumeroElemento` mediumint(9)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `getholdersdata`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `getholdersdata` (
`IdHolder` int(11)
,`IdSaga` int(11)
,`TituloHolder` varchar(60)
,`DescripcionHolder` text
,`IdCategoria` tinyint(4)
,`URLHolder` varchar(30)
,`NombreCategoria` varchar(15)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `getpersonajesdata`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `getpersonajesdata` (
`idpersonaje` int(11)
,`idHolder` int(11)
,`nombrepersonaje` varchar(50)
,`descripcionpersonaje` blob
,`numeroimagenes` tinyint(4)
,`urlpersonaje` varchar(30)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `getrelatedholders`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `getrelatedholders` (
`IdSaga` int(11)
,`IdHolder` int(11)
,`IdPersonaje` int(11)
,`TituloHolder` varchar(60)
,`NombreCategoria` varchar(15)
,`URLHolder` varchar(30)
,`URLSaga` varchar(50)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `getsagacategs`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `getsagacategs` (
`IdSaga` int(11)
,`NombreCategoria` varchar(15)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `gettagsinfo`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `gettagsinfo` (
`IdTag` int(11)
,`IdHolder` int(11)
,`NombreTag` varchar(30)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `getuserinformation`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `getuserinformation` (
`idUsuario` varchar(30)
,`NombreUsuario` varchar(50)
,`Descripcion` text
,`Sexo` varchar(30)
,`Ubicacion` varchar(60)
,`FechaDeRegistro` date
,`IdiomaPreferido` tinyint(4)
,`Edad` varchar(3)
,`NotificacionCorreo` tinyint(1)
,`Nickname` varchar(20)
,`ConfiguracionInicial` tinyint(1)
,`idTipo` tinyint(4)
,`cuenta` varchar(10)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `getusers`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `getusers` (
`IdUsuario` varchar(30)
,`nickname` varchar(20)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `holder`
--

CREATE TABLE `holder` (
  `IdHolder` int(11) NOT NULL,
  `IdSaga` int(11) NOT NULL,
  `TituloHolder` varchar(60) NOT NULL,
  `DescripcionHolder` text NOT NULL,
  `IdCategoria` tinyint(4) NOT NULL,
  `URLHolder` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `holder`
--

INSERT INTO `holder` (`IdHolder`, `IdSaga`, `TituloHolder`, `DescripcionHolder`, `IdCategoria`, `URLHolder`) VALUES
(6, 3, 'adfasf', 'Descripcion vacia', 1, 'adfasf'),
(7, 2, 'Titulo vacio', 'Descripcion vacia', 4, 'titulo-vacio'),
(8, 3, 'mangaa', 'Descripcion vacia', 1, 'mangaa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `holderpersonajes`
--

CREATE TABLE `holderpersonajes` (
  `IdHolPer` int(11) NOT NULL,
  `IdHolder` int(11) NOT NULL,
  `IdPersonaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `holdertags`
--

CREATE TABLE `holdertags` (
  `IdHolTag` int(11) NOT NULL,
  `IdHolder` int(11) NOT NULL,
  `IdTag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `holdertags`
--

INSERT INTO `holdertags` (`IdHolTag`, `IdHolder`, `IdTag`) VALUES
(1, 6, 1),
(2, 7, 1),
(3, 8, 1),
(4, 8, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hub`
--

CREATE TABLE `hub` (
  `IdHub` int(11) NOT NULL,
  `TituloHub` varchar(100) NOT NULL,
  `IdUsuario` varchar(30) NOT NULL,
  `IdSaga` int(11) NOT NULL,
  `IdPersonaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenhub`
--

CREATE TABLE `imagenhub` (
  `IdImagen` int(11) NOT NULL,
  `URLImagen` varchar(100) NOT NULL,
  `NumeroElemento` int(11) NOT NULL,
  `PieImagen` varchar(250) NOT NULL,
  `FechaDeCreacion` date NOT NULL,
  `IdUsuario` varchar(30) NOT NULL,
  `IdHub` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likepost`
--

CREATE TABLE `likepost` (
  `IdPost` int(11) NOT NULL,
  `IdUsuario` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logros`
--

CREATE TABLE `logros` (
  `IdLogro` smallint(6) NOT NULL,
  `Recompensa` smallint(6) NOT NULL,
  `Descripcion` text NOT NULL,
  `Titulo` varchar(50) NOT NULL,
  `repeticiones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `logros`
--

INSERT INTO `logros` (`IdLogro`, `Recompensa`, `Descripcion`, `Titulo`, `repeticiones`) VALUES
(3, 50, 'termine de ver 12 episodios de la misma o cualquier otra serie en la página', 'Maratón de series I', 12),
(4, 100, 'termine de ver 24 episodios de la misma o cualquier otra serie en la página', 'Maratón de series II', 24),
(5, 250, 'termine de ver 48 episodios de la misma o cualquier otra serie en la página', 'Maratón de series II', 48),
(6, 500, 'termine de ver 100 episodios de la misma o cualquier otra serie en la página', 'Maratón de series IV', 100),
(7, 1000, 'termine de ver 250 episodios de la misma o cualquier otra serie en la página', 'Maratón de series V', 250),
(8, 50, 'termine de ver 24 episodios del mismo o cualquier otro anime en la página', 'Consumidor de anime I', 24),
(9, 100, 'termine de ver 48 episodios del mismo o cualquier otro anime en la página', 'Consumidor de anime II', 48),
(10, 250, 'termine de ver 100 episodios del mismo o cualquier otro anime en la página', 'Consumidor de anime III', 100),
(11, 500, 'termine de ver 250 episodios del mismo o cualquier otro anime en la página', 'Consumidor de anime IV', 250),
(12, 1000, 'termine de ver 500 episodios del mismo o cualquier otro anime en la página', 'Consumidor de anime V', 500),
(13, 50, 'termine de leer 2 libros', 'Comedor de libros I', 2),
(14, 100, 'termine de leer 5 libros', 'Comedor de libros II', 5),
(15, 250, 'termine de leer 10 libros', 'Comedor de libros II', 10),
(16, 500, 'termine de leer 25 libros', 'Comedor de libros IV', 25),
(17, 100, 'termine de leer 50 libros', 'Comedor de libros V', 50),
(18, 50, 'termine de ver 5 películas que estén registradas en la página', 'Cinéfilo I', 5),
(19, 100, 'termine de ver 10 películas que estén registradas en la página', 'Cinéfilo II', 10),
(20, 250, 'termine de ver 25 películas que estén registradas en la página', 'Cinéfilo III', 25),
(21, 500, 'termine de ver 50 películas que estén registradas en la página', 'Cinéfilo IV', 50),
(22, 1000, 'termine de ver 100 películas que estén registradas en la página', 'Cinéfilo V', 100),
(23, 50, 'termine de leer 10 cómics que estén registrados en la página', 'Aficionado de cómics I', 10),
(24, 100, 'termine de leer 20 cómics que estén registrados en la página', 'Aficionado de cómics II', 20),
(25, 250, 'termine de leer 50 cómics que estén registrados en la página', 'Aficionado de cómics III', 50),
(26, 500, 'termine de leer 100 cómics que estén registrados en la página', 'Aficionado de cómics IV', 100),
(27, 1000, 'termine de leer 250 cómics que estén registrados en la página', 'Aficionado de cómics V', 250),
(28, 50, 'Termine de leer 10 mangas que estén registrados en la página', 'Lector de manga I', 10),
(29, 100, 'Termine de leer 20 mangas que estén registrados en la página', 'Lector de manga II', 20),
(30, 250, 'Termine de leer 50 mangas que estén registrados en la página', 'Lector de manga III', 50),
(31, 500, 'Termine de leer 100 mangas que estén registrados en la página', 'Lector de manga IV', 100),
(32, 1000, 'Termine de leer 250 mangas que estén registrados en la página', 'Lector de manga V', 250),
(33, 50, 'termine de leer 10 revistas que estén registradas en la página', 'Apreciador de revistas I', 10),
(34, 100, 'termine de leer 20 revistas que estén registradas en la página', 'Apreciador de revistas II', 20),
(35, 250, 'termine de leer 50 revistas que estén registradas en la página', 'Apreciador de revistas III', 50),
(36, 500, 'termine de leer 100 revistas que estén registradas en la página', 'Apreciador de revistas IV', 100),
(37, 1000, 'termine de leer 250 revistas que estén registradas en la página', 'Apreciador de revistas V', 250),
(38, 50, 'termine de escuchar 12 álbumes que estén registrados en la página', 'Conocedor de música I', 12),
(39, 100, 'termine de escuchar 24 álbumes que estén registrados en la página', 'Conocedor de música II', 24),
(40, 250, 'termine de escuchar 48 álbumes que estén registrados en la página', 'Conocedor de música III', 48),
(41, 500, 'termine de escuchar 100 álbumes que estén registrados en la página', 'Conocedor de música IV', 100),
(42, 1000, 'termine de escuchar 250 álbumes que estén registrados en la página', 'Conocedor de música V', 250),
(43, 50, 'haga 25 publicaciones distintas ya sea en el foro o en algún Hub', 'Creador de contenido I', 25),
(44, 100, 'haga 50 publicaciones distintas ya sea en el foro o en algún Hub', 'Creador de contenido II', 50),
(45, 250, 'haga 100 publicaciones distintas ya sea en el foro o en algún Hub', 'Creador de contenido III', 100),
(46, 500, 'haga 250 publicaciones distintas ya sea en el foro o en algún Hub', 'Creador de contenido IV', 250),
(47, 1000, 'haga 500 publicaciones distintas ya sea en el foro o en algún Hub', 'Creador de contenido V', 500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personajes`
--

CREATE TABLE `personajes` (
  `IdPersonaje` int(11) NOT NULL,
  `NombrePersonaje` varchar(50) NOT NULL,
  `DescripcionPersonaje` blob NOT NULL,
  `NumeroImagenes` tinyint(4) NOT NULL,
  `URLPersonaje` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `personajes`
--

INSERT INTO `personajes` (`IdPersonaje`, `NombrePersonaje`, `DescripcionPersonaje`, `NumeroImagenes`, `URLPersonaje`) VALUES
(1, 'adfaf', 0x616473666173646661, 1, 'adfaf'),
(2, 'edgar', '', 1, 'edgar'),
(3, 'edgar', '', 1, 'edgar'),
(4, 'edgar', '', 1, 'edgar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personalizacion`
--

CREATE TABLE `personalizacion` (
  `IdPersonalizacion` int(11) NOT NULL,
  `IdUsuario` varchar(30) NOT NULL,
  `NombreUsuario` varchar(50) NOT NULL DEFAULT ' ',
  `Descripcion` text NOT NULL,
  `Sexo` varchar(30) NOT NULL DEFAULT ' ',
  `Ubicacion` varchar(60) NOT NULL DEFAULT ' ',
  `Imagen` varchar(200) NOT NULL DEFAULT ' https://homuapp.000webhostapp.com/Imagenes/4-1-2019-22-24-45.jpg',
  `FechaDeRegistro` date NOT NULL,
  `IdiomaPreferido` tinyint(4) NOT NULL DEFAULT 1,
  `Edad` varchar(3) NOT NULL DEFAULT ' ',
  `NotificacionCorreo` tinyint(1) NOT NULL DEFAULT 0,
  `Nickname` varchar(20) NOT NULL DEFAULT ' ',
  `ConfiguracionInicial` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `personalizacion`
--

INSERT INTO `personalizacion` (`IdPersonalizacion`, `IdUsuario`, `NombreUsuario`, `Descripcion`, `Sexo`, `Ubicacion`, `Imagen`, `FechaDeRegistro`, `IdiomaPreferido`, `Edad`, `NotificacionCorreo`, `Nickname`, `ConfiguracionInicial`) VALUES
(8, 'AWB6wjwgZgVIv70pNzsWgMUiaqB2', ' ', '', ' ', ' ', '', '2019-03-08', 1, ' ', 0, 'El Madoko', 1),
(9, 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 'edgar', '.', ' hombre', ' gdl', '', '2019-09-18', 1, ' 19', 0, ' edgarmtz00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `IdPost` int(11) NOT NULL,
  `ContenidoPost` varchar(250) NOT NULL,
  `FechaDeCreacion` date NOT NULL,
  `IdUsuario` varchar(30) NOT NULL,
  `IdThread` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`IdPost`, `ContenidoPost`, `FechaDeCreacion`, `IdUsuario`, `IdThread`) VALUES
(1, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(2, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(3, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(4, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(5, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(6, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(7, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(8, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(9, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(10, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(11, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(12, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(13, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1),
(14, 'lolololollollolollo', '0000-00-00', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL,
  `idUsuario` varchar(30) NOT NULL,
  `nombreProducto` varchar(45) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `cantidad` smallint(6) NOT NULL,
  `precio` double(7,2) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `numeroElemento` int(11) NOT NULL,
  `categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProducto`, `idUsuario`, `nombreProducto`, `descripcion`, `cantidad`, `precio`, `imagen`, `numeroElemento`, `categoria`) VALUES
(1, 'AWB6wjwgZgVIv70pNzsWgMUiaqB2', 'cosas', 'wea', 1000, 15.50, 'http://lorempixel.com/400/400/', 10, 'khe'),
(2, 'AWB6wjwgZgVIv70pNzsWgMUiaqB2', 'cosa2', 'wea', 10, 500.00, '', 13, 'khe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productosvendidos`
--

CREATE TABLE `productosvendidos` (
  `idProducto` int(11) NOT NULL DEFAULT 0,
  `idUsuario` varchar(30) NOT NULL,
  `nombreProducto` varchar(45) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `cantidad` smallint(6) NOT NULL,
  `precio` double(7,2) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `numeroElemento` int(11) NOT NULL,
  `categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productosvendidos`
--

INSERT INTO `productosvendidos` (`idProducto`, `idUsuario`, `nombreProducto`, `descripcion`, `cantidad`, `precio`, `imagen`, `numeroElemento`, `categoria`) VALUES
(38, 'AWB6wjwgZgVIv70pNzsWgMUiaqB2', 'Fate Espadota', 'Una Fate con una espadota como el gatsu', 1, 500.00, 'imagen', 1, 'Figura'),
(39, 'AWB6wjwgZgVIv70pNzsWgMUiaqB2', 'Cheto en forma de pistola', 'Cheto en forma de pistola', 0, 0.00, 'imagen', 1, 'Chetos'),
(40, 'AWB6wjwgZgVIv70pNzsWgMUiaqB2', 'Vendo gato', 'Vendo gato porque es bien latoso', 1, 30.00, 'imagen', 1, 'Mascotas'),
(41, 'AWB6wjwgZgVIv70pNzsWgMUiaqB2', 'Vendo bebe', 'No es mi bebe, me engaÃ±aron asi que lo vendo', 1, 300.00, 'imagen', 1, 'Bebes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportescomentarios`
--

CREATE TABLE `reportescomentarios` (
  `idReporte` int(11) NOT NULL,
  `idUsuarioDelReporte` varchar(30) NOT NULL,
  `idUsuarioDelComentario` varchar(30) NOT NULL,
  `idComentario` varchar(20) NOT NULL,
  `comentarioReportado` text NOT NULL,
  `textoDelReporte` text NOT NULL,
  `urlComentario` varchar(150) NOT NULL,
  `tipoReporte` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `reportescomentarios`
--

INSERT INTO `reportescomentarios` (`idReporte`, `idUsuarioDelReporte`, `idUsuarioDelComentario`, `idComentario`, `comentarioReportado`, `textoDelReporte`, `urlComentario`, `tipoReporte`) VALUES
(3, 'BpZ28mjcitgqRnLX1N8jImUl6lO2', 'BpZ28mjcitgqRnLX1N8jImUl6lO2', '-LeyYLe6pQ_bVrZpUzsB', 'Prueba', 'Prueba', '/social/2/1/8', 'Comentario'),
(4, 'BpZ28mjcitgqRnLX1N8jImUl6lO2', 'UO6GgA1HonYuP5DrYSOslx1Ldq53', '-LeD8q7DAYjPJwCI2O0d', 'sddddd', 'Prueba de reporte de comentario de otro usuario', '/sagas/puella-magi-madoka-magica/el-comico-xd', 'Comentario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ropa`
--

CREATE TABLE `ropa` (
  `IdRopa` smallint(6) NOT NULL,
  `NombreDeRopa` varchar(25) NOT NULL,
  `Precio` smallint(6) NOT NULL,
  `Categoria` tinyint(4) NOT NULL,
  `IdSaga` int(11) NOT NULL,
  `Thumbnail` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ropa`
--

INSERT INTO `ropa` (`IdRopa`, `NombreDeRopa`, `Precio`, `Categoria`, `IdSaga`, `Thumbnail`) VALUES
(1, 'Vestido de Madoka', 10, 5, 2, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ropacategorias`
--

CREATE TABLE `ropacategorias` (
  `idCategoria` tinyint(4) NOT NULL,
  `nombreCategoria` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ropacategorias`
--

INSERT INTO `ropacategorias` (`idCategoria`, `nombreCategoria`) VALUES
(1, 'Cabeza'),
(2, 'Cara'),
(4, 'Cuello'),
(5, 'Cuerpo'),
(6, 'Manos'),
(7, 'Gorros'),
(8, 'Fondos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `saga`
--

CREATE TABLE `saga` (
  `IdSaga` int(11) NOT NULL,
  `TituloSaga` varchar(60) NOT NULL,
  `ThumbnailSaga` varchar(100) NOT NULL,
  `BackgroundSaga` varchar(100) NOT NULL,
  `URLSaga` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `saga`
--

INSERT INTO `saga` (`IdSaga`, `TituloSaga`, `ThumbnailSaga`, `BackgroundSaga`, `URLSaga`) VALUES
(2, 'Puella Magi Madoka Magica', '55225.jpg', '15-1-2019-2-20-45.jpg', 'puella-magi-madoka-magica'),
(3, 'Titulo Vacio', 'c9cd693c4f.jpg', 'd4c7e20a44.jpg', 'titulo-vacio'),
(4, 'La saga de prueba', '6acb2519fa.jpg', '1959a2efc2.jpg', 'la-saga-de-prueba'),
(5, 'Otra saga de prueba', '0069157141.jpg', '024ed04e0f.jpg', 'otra-saga-de-prueba'),
(6, 'Una mas y nos vamos', 'e912d68f79.jpg', '3a846913fc.jpg', 'una-mas-y-nos-vamos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sagacateg`
--

CREATE TABLE `sagacateg` (
  `idSaga` int(11) NOT NULL,
  `idCategoria` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sagacateg`
--

INSERT INTO `sagacateg` (`idSaga`, `idCategoria`) VALUES
(2, 1),
(3, 4),
(2, 3),
(2, 5),
(2, 1),
(3, 4),
(2, 3),
(2, 5),
(2, 1),
(3, 4),
(2, 3),
(2, 5),
(2, 1),
(3, 4),
(2, 3),
(2, 5),
(2, 1),
(3, 4),
(2, 3),
(2, 5),
(2, 1),
(3, 4),
(2, 3),
(2, 1),
(3, 4),
(2, 3),
(2, 5),
(2, 1),
(3, 4),
(2, 3),
(2, 5),
(2, 1),
(3, 4),
(2, 3),
(2, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE `tags` (
  `IdTag` int(11) NOT NULL,
  `NombreTag` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tags`
--

INSERT INTO `tags` (`IdTag`, `NombreTag`) VALUES
(1, 'Mahou Shoujo'),
(2, 'Tecnocumbierovegano');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `thread`
--

CREATE TABLE `thread` (
  `IdThread` int(11) NOT NULL,
  `TituloThread` varchar(100) NOT NULL,
  `ContenidoThread` varchar(250) NOT NULL,
  `FechaDeCreacion` date NOT NULL,
  `IdUsuario` varchar(30) NOT NULL,
  `IdSaga` int(11) NOT NULL,
  `IdCategoriaForo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `thread`
--

INSERT INTO `thread` (`IdThread`, `TituloThread`, `ContenidoThread`, `FechaDeCreacion`, `IdUsuario`, `IdSaga`, `IdCategoriaForo`) VALUES
(1, 'lololol', 'lololol  <b>afsdafssdfas</b>', '2019-11-06', 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipocontenido`
--

CREATE TABLE `tipocontenido` (
  `idTipo` tinyint(4) NOT NULL,
  `Nombre` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipocontenido`
--

INSERT INTO `tipocontenido` (`idTipo`, `Nombre`) VALUES
(1, 'Imagen'),
(2, 'Video'),
(3, 'Audio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposusuario`
--

CREATE TABLE `tiposusuario` (
  `idTipo` tinyint(4) NOT NULL,
  `descripcion` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tiposusuario`
--

INSERT INTO `tiposusuario` (`idTipo`, `descripcion`) VALUES
(1, 'Dios'),
(2, 'CDC'),
(3, 'Moderador'),
(4, 'Consumidor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `IdUsuario` varchar(30) NOT NULL,
  `TipoDeUsuario` tinyint(4) NOT NULL,
  `Correo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`IdUsuario`, `TipoDeUsuario`, `Correo`) VALUES
('AWB6wjwgZgVIv70pNzsWgMUiaqB2', 4, 'h3lltronik@hotmail.com'),
('YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 2, 'edgar.agustin.martinez@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioemoticon`
--

CREATE TABLE `usuarioemoticon` (
  `IdUsuario` varchar(30) NOT NULL,
  `IdEmoticon` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariologros`
--

CREATE TABLE `usuariologros` (
  `id` int(11) NOT NULL,
  `IdUsuario` varchar(30) NOT NULL,
  `IdLogro` smallint(6) NOT NULL,
  `progreso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuariologros`
--

INSERT INTO `usuariologros` (`id`, `IdUsuario`, `IdLogro`, `progreso`) VALUES
(3, 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 43, 5),
(4, 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 44, 3),
(5, 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 45, 3),
(6, 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 46, 3),
(7, 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 47, 3),
(9, 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 28, 3),
(10, 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 29, 3),
(11, 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 30, 3),
(12, 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 31, 3),
(13, 'YAh8Mz5O9hVfgGPClmnnnOhLcSI2', 32, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioropa`
--

CREATE TABLE `usuarioropa` (
  `IdUsuario` varchar(30) NOT NULL,
  `IdRopa` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioventa`
--

CREATE TABLE `usuarioventa` (
  `IdVenta` int(11) NOT NULL,
  `IdUsuario` varchar(30) NOT NULL,
  `Calificacion` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `IdVenta` int(11) NOT NULL,
  `IdUsuario` varchar(30) NOT NULL,
  `Titulo` varchar(100) NOT NULL,
  `Detalles` text NOT NULL,
  `Precio` varchar(10) NOT NULL,
  `Ubicacion` varchar(60) NOT NULL,
  `FechaDePublicacion` date NOT NULL,
  `IdSaga` int(11) NOT NULL,
  `Disponibilidad` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `watchlist`
--

CREATE TABLE `watchlist` (
  `IdUsuario` varchar(30) NOT NULL,
  `IdHolder` int(11) NOT NULL,
  `orden` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura para la vista `getamigos`
--
DROP TABLE IF EXISTS `getamigos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `getamigos`  AS  select `amigos`.`IdUsuario` AS `idUsuario`,`personalizacion`.`IdUsuario` AS `IdAmigo`,`amigos`.`idChat` AS `idChat`,`personalizacion`.`Nickname` AS `Nickname`,`personalizacion`.`Imagen` AS `Imagen` from (`amigos` join `personalizacion` on(`amigos`.`IdUsuario2` = `personalizacion`.`IdUsuario`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `getcategoriastype`
--
DROP TABLE IF EXISTS `getcategoriastype`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `getcategoriastype`  AS  select `categorias`.`IdCategoria` AS `Idcategoria`,`categorias`.`idTipo` AS `IdTipo`,`categorias`.`NombreCategoria` AS `NombreCategoria`,`tipocontenido`.`Nombre` AS `TipoContenido` from (`categorias` join `tipocontenido` on(`categorias`.`idTipo` = `tipocontenido`.`idTipo`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `getcontentdata`
--
DROP TABLE IF EXISTS `getcontentdata`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `getcontentdata`  AS  select `contenido`.`IdHolder` AS `IdHolder`,`contenido`.`TituloContenido` AS `TituloContenido`,`contenido`.`URLContenido` AS `URLContenido`,`contenido`.`NumeroElemento` AS `NumeroElemento` from (`contenido` join `holder` on(`contenido`.`IdHolder` = `holder`.`IdHolder`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `getholdersdata`
--
DROP TABLE IF EXISTS `getholdersdata`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `getholdersdata`  AS  select `holder`.`IdHolder` AS `IdHolder`,`holder`.`IdSaga` AS `IdSaga`,`holder`.`TituloHolder` AS `TituloHolder`,`holder`.`DescripcionHolder` AS `DescripcionHolder`,`holder`.`IdCategoria` AS `IdCategoria`,`holder`.`URLHolder` AS `URLHolder`,`categorias`.`NombreCategoria` AS `NombreCategoria` from (`holder` join `categorias` on(`holder`.`IdCategoria` = `categorias`.`IdCategoria`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `getpersonajesdata`
--
DROP TABLE IF EXISTS `getpersonajesdata`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `getpersonajesdata`  AS  select `personajes`.`IdPersonaje` AS `idpersonaje`,`holderpersonajes`.`IdHolder` AS `idHolder`,`personajes`.`NombrePersonaje` AS `nombrepersonaje`,`personajes`.`DescripcionPersonaje` AS `descripcionpersonaje`,`personajes`.`NumeroImagenes` AS `numeroimagenes`,`personajes`.`URLPersonaje` AS `urlpersonaje` from (`personajes` join `holderpersonajes` on(`personajes`.`IdPersonaje` = `holderpersonajes`.`IdPersonaje`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `getrelatedholders`
--
DROP TABLE IF EXISTS `getrelatedholders`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `getrelatedholders`  AS  select `holder`.`IdSaga` AS `IdSaga`,`holder`.`IdHolder` AS `IdHolder`,`getpersonajesdata`.`idpersonaje` AS `IdPersonaje`,`holder`.`TituloHolder` AS `TituloHolder`,`categorias`.`NombreCategoria` AS `NombreCategoria`,`holder`.`URLHolder` AS `URLHolder`,`saga`.`URLSaga` AS `URLSaga` from (((`getpersonajesdata` join `holder` on(`getpersonajesdata`.`idHolder` = `holder`.`IdHolder`)) join `categorias` on(`categorias`.`IdCategoria` = `holder`.`IdCategoria`)) join `saga` on(`holder`.`IdSaga` = `saga`.`IdSaga`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `getsagacategs`
--
DROP TABLE IF EXISTS `getsagacategs`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `getsagacategs`  AS  select `saga`.`IdSaga` AS `IdSaga`,`categorias`.`NombreCategoria` AS `NombreCategoria` from ((`sagacateg` join `saga` on(`sagacateg`.`idSaga` = `saga`.`IdSaga`)) join `categorias` on(`categorias`.`IdCategoria` = `sagacateg`.`idCategoria`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `gettagsinfo`
--
DROP TABLE IF EXISTS `gettagsinfo`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `gettagsinfo`  AS  select `tags`.`IdTag` AS `IdTag`,`holdertags`.`IdHolder` AS `IdHolder`,`tags`.`NombreTag` AS `NombreTag` from (`holdertags` join `tags` on(`holdertags`.`IdTag` = `tags`.`IdTag`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `getuserinformation`
--
DROP TABLE IF EXISTS `getuserinformation`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `getuserinformation`  AS  select `usuario`.`IdUsuario` AS `idUsuario`,`personalizacion`.`NombreUsuario` AS `NombreUsuario`,`personalizacion`.`Descripcion` AS `Descripcion`,`personalizacion`.`Sexo` AS `Sexo`,`personalizacion`.`Ubicacion` AS `Ubicacion`,`personalizacion`.`FechaDeRegistro` AS `FechaDeRegistro`,`personalizacion`.`IdiomaPreferido` AS `IdiomaPreferido`,`personalizacion`.`Edad` AS `Edad`,`personalizacion`.`NotificacionCorreo` AS `NotificacionCorreo`,`personalizacion`.`Nickname` AS `Nickname`,`personalizacion`.`ConfiguracionInicial` AS `ConfiguracionInicial`,`tiposusuario`.`idTipo` AS `idTipo`,`tiposusuario`.`descripcion` AS `cuenta` from ((`personalizacion` join `usuario` on(`personalizacion`.`IdUsuario` = `usuario`.`IdUsuario`)) join `tiposusuario` on(`usuario`.`TipoDeUsuario` = `tiposusuario`.`idTipo`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `getusers`
--
DROP TABLE IF EXISTS `getusers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `getusers`  AS  select `usuario`.`IdUsuario` AS `IdUsuario`,`personalizacion`.`Nickname` AS `nickname` from (`usuario` join `personalizacion` on(`usuario`.`IdUsuario` = `personalizacion`.`IdUsuario`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD PRIMARY KEY (`idAmistad`),
  ADD KEY `AmigoUsuario2` (`IdUsuario2`),
  ADD KEY `IdUsuario` (`IdUsuario`) USING BTREE;

--
-- Indices de la tabla `categoriaforo`
--
ALTER TABLE `categoriaforo`
  ADD PRIMARY KEY (`IdCategoriaForo`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`IdCategoria`),
  ADD KEY `tipodecategoria` (`idTipo`);

--
-- Indices de la tabla `contadordeusuario`
--
ALTER TABLE `contadordeusuario`
  ADD KEY `ContadorPersonalizacion` (`IdContador`);

--
-- Indices de la tabla `contenido`
--
ALTER TABLE `contenido`
  ADD PRIMARY KEY (`IdContenido`),
  ADD UNIQUE KEY `URLContenido` (`URLContenido`),
  ADD KEY `HolderContenido` (`IdHolder`);

--
-- Indices de la tabla `emoticon`
--
ALTER TABLE `emoticon`
  ADD PRIMARY KEY (`IdEmoticon`),
  ADD KEY `SagaEmoticon` (`IdSaga`);

--
-- Indices de la tabla `holder`
--
ALTER TABLE `holder`
  ADD PRIMARY KEY (`IdHolder`),
  ADD KEY `SagaHolder` (`IdSaga`),
  ADD KEY `CategoriaHolder` (`IdCategoria`);

--
-- Indices de la tabla `holderpersonajes`
--
ALTER TABLE `holderpersonajes`
  ADD PRIMARY KEY (`IdHolPer`),
  ADD KEY `PersonajeHolder` (`IdPersonaje`),
  ADD KEY `HolderPersonaje` (`IdHolder`);

--
-- Indices de la tabla `holdertags`
--
ALTER TABLE `holdertags`
  ADD PRIMARY KEY (`IdHolTag`),
  ADD KEY `TagHolder` (`IdTag`),
  ADD KEY `HolderTag` (`IdHolder`);

--
-- Indices de la tabla `hub`
--
ALTER TABLE `hub`
  ADD PRIMARY KEY (`IdHub`),
  ADD KEY `PersonajesHub` (`IdPersonaje`),
  ADD KEY `SagasHub` (`IdSaga`),
  ADD KEY `UsuarioHub` (`IdUsuario`);

--
-- Indices de la tabla `imagenhub`
--
ALTER TABLE `imagenhub`
  ADD PRIMARY KEY (`IdImagen`),
  ADD KEY `HubImagen` (`IdHub`),
  ADD KEY `UsuarioImagen` (`IdUsuario`);

--
-- Indices de la tabla `likepost`
--
ALTER TABLE `likepost`
  ADD KEY `PostLike` (`IdPost`),
  ADD KEY `UsuarioLike` (`IdUsuario`);

--
-- Indices de la tabla `logros`
--
ALTER TABLE `logros`
  ADD PRIMARY KEY (`IdLogro`);

--
-- Indices de la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD PRIMARY KEY (`IdPersonaje`);

--
-- Indices de la tabla `personalizacion`
--
ALTER TABLE `personalizacion`
  ADD PRIMARY KEY (`IdPersonalizacion`),
  ADD KEY `UsuarioPersonalizacion` (`IdUsuario`);

--
-- Indices de la tabla `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`IdPost`),
  ADD KEY `ThreadPost` (`IdThread`),
  ADD KEY `UsuarioPost` (`IdUsuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `productosvendidos`
--
ALTER TABLE `productosvendidos`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `reportescomentarios`
--
ALTER TABLE `reportescomentarios`
  ADD PRIMARY KEY (`idReporte`),
  ADD KEY `UsuarioDelComentario` (`idUsuarioDelComentario`),
  ADD KEY `UsuarioDelReporte` (`idUsuarioDelReporte`);

--
-- Indices de la tabla `ropa`
--
ALTER TABLE `ropa`
  ADD PRIMARY KEY (`IdRopa`),
  ADD KEY `SagaRopa` (`IdSaga`),
  ADD KEY `ropacategoria` (`Categoria`);

--
-- Indices de la tabla `ropacategorias`
--
ALTER TABLE `ropacategorias`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `saga`
--
ALTER TABLE `saga`
  ADD PRIMARY KEY (`IdSaga`);

--
-- Indices de la tabla `sagacateg`
--
ALTER TABLE `sagacateg`
  ADD KEY `categcateg` (`idCategoria`),
  ADD KEY `sagasaga` (`idSaga`);

--
-- Indices de la tabla `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`IdTag`);

--
-- Indices de la tabla `thread`
--
ALTER TABLE `thread`
  ADD PRIMARY KEY (`IdThread`),
  ADD KEY `SagaThread` (`IdSaga`),
  ADD KEY `UsuarioThread` (`IdUsuario`),
  ADD KEY `CategoriaThread` (`IdCategoriaForo`);

--
-- Indices de la tabla `tipocontenido`
--
ALTER TABLE `tipocontenido`
  ADD PRIMARY KEY (`idTipo`);

--
-- Indices de la tabla `tiposusuario`
--
ALTER TABLE `tiposusuario`
  ADD PRIMARY KEY (`idTipo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IdUsuario`),
  ADD KEY `tipodeusuario` (`TipoDeUsuario`);

--
-- Indices de la tabla `usuarioemoticon`
--
ALTER TABLE `usuarioemoticon`
  ADD KEY `EmoticonUsuario` (`IdEmoticon`),
  ADD KEY `UsuarioEmoticon` (`IdUsuario`);

--
-- Indices de la tabla `usuariologros`
--
ALTER TABLE `usuariologros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `LogrosUsuario` (`IdLogro`),
  ADD KEY `UsuarioLogros` (`IdUsuario`);

--
-- Indices de la tabla `usuarioropa`
--
ALTER TABLE `usuarioropa`
  ADD KEY `RopaUsuario` (`IdRopa`),
  ADD KEY `UsuarioRopa` (`IdUsuario`);

--
-- Indices de la tabla `usuarioventa`
--
ALTER TABLE `usuarioventa`
  ADD KEY `VentaUsuario` (`IdVenta`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`IdVenta`),
  ADD KEY `UsuarioVenta` (`IdUsuario`),
  ADD KEY `SagaVenta` (`IdSaga`);

--
-- Indices de la tabla `watchlist`
--
ALTER TABLE `watchlist`
  ADD KEY `UsuarioContenido` (`IdUsuario`),
  ADD KEY `ContenidoUsuario` (`IdHolder`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `amigos`
--
ALTER TABLE `amigos`
  MODIFY `idAmistad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoriaforo`
--
ALTER TABLE `categoriaforo`
  MODIFY `IdCategoriaForo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `IdCategoria` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `contadordeusuario`
--
ALTER TABLE `contadordeusuario`
  MODIFY `IdContador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contenido`
--
ALTER TABLE `contenido`
  MODIFY `IdContenido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `emoticon`
--
ALTER TABLE `emoticon`
  MODIFY `IdEmoticon` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `holder`
--
ALTER TABLE `holder`
  MODIFY `IdHolder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `holderpersonajes`
--
ALTER TABLE `holderpersonajes`
  MODIFY `IdHolPer` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `holdertags`
--
ALTER TABLE `holdertags`
  MODIFY `IdHolTag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `hub`
--
ALTER TABLE `hub`
  MODIFY `IdHub` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imagenhub`
--
ALTER TABLE `imagenhub`
  MODIFY `IdImagen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `logros`
--
ALTER TABLE `logros`
  MODIFY `IdLogro` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `personajes`
--
ALTER TABLE `personajes`
  MODIFY `IdPersonaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `personalizacion`
--
ALTER TABLE `personalizacion`
  MODIFY `IdPersonalizacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `IdPost` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `reportescomentarios`
--
ALTER TABLE `reportescomentarios`
  MODIFY `idReporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ropa`
--
ALTER TABLE `ropa`
  MODIFY `IdRopa` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ropacategorias`
--
ALTER TABLE `ropacategorias`
  MODIFY `idCategoria` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `saga`
--
ALTER TABLE `saga`
  MODIFY `IdSaga` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tags`
--
ALTER TABLE `tags`
  MODIFY `IdTag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `thread`
--
ALTER TABLE `thread`
  MODIFY `IdThread` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipocontenido`
--
ALTER TABLE `tipocontenido`
  MODIFY `idTipo` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tiposusuario`
--
ALTER TABLE `tiposusuario`
  MODIFY `idTipo` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuariologros`
--
ALTER TABLE `usuariologros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `IdVenta` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD CONSTRAINT `AmigoUsuario2` FOREIGN KEY (`IdUsuario2`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `AmigosUsuario` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD CONSTRAINT `tipodecategoria` FOREIGN KEY (`idTipo`) REFERENCES `tipocontenido` (`idTipo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contadordeusuario`
--
ALTER TABLE `contadordeusuario`
  ADD CONSTRAINT `ContadorPersonalizacion` FOREIGN KEY (`IdContador`) REFERENCES `personalizacion` (`IdPersonalizacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contenido`
--
ALTER TABLE `contenido`
  ADD CONSTRAINT `HolderContenido` FOREIGN KEY (`IdHolder`) REFERENCES `holder` (`IdHolder`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `emoticon`
--
ALTER TABLE `emoticon`
  ADD CONSTRAINT `SagaEmoticon` FOREIGN KEY (`IdSaga`) REFERENCES `saga` (`IdSaga`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `holder`
--
ALTER TABLE `holder`
  ADD CONSTRAINT `CategoriaHolder` FOREIGN KEY (`IdCategoria`) REFERENCES `categorias` (`IdCategoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SagaHolder` FOREIGN KEY (`IdSaga`) REFERENCES `saga` (`IdSaga`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `holderpersonajes`
--
ALTER TABLE `holderpersonajes`
  ADD CONSTRAINT `HolderPersonaje` FOREIGN KEY (`IdHolder`) REFERENCES `holder` (`IdHolder`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PersonajeHolder` FOREIGN KEY (`IdPersonaje`) REFERENCES `personajes` (`IdPersonaje`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `holdertags`
--
ALTER TABLE `holdertags`
  ADD CONSTRAINT `HolderTag` FOREIGN KEY (`IdHolder`) REFERENCES `holder` (`IdHolder`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TagHolder` FOREIGN KEY (`IdTag`) REFERENCES `tags` (`IdTag`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `personalizacion`
--
ALTER TABLE `personalizacion`
  ADD CONSTRAINT `UsuarioPersonalizacion` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `ThreadPost` FOREIGN KEY (`IdThread`) REFERENCES `thread` (`IdThread`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UsuarioPost` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productosvendidos`
--
ALTER TABLE `productosvendidos`
  ADD CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ropa`
--
ALTER TABLE `ropa`
  ADD CONSTRAINT `SagaRopa` FOREIGN KEY (`IdSaga`) REFERENCES `saga` (`IdSaga`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `ropacategoria` FOREIGN KEY (`Categoria`) REFERENCES `ropacategorias` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sagacateg`
--
ALTER TABLE `sagacateg`
  ADD CONSTRAINT `categcateg` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`IdCategoria`) ON DELETE CASCADE,
  ADD CONSTRAINT `sagasaga` FOREIGN KEY (`idSaga`) REFERENCES `saga` (`IdSaga`) ON DELETE CASCADE;

--
-- Filtros para la tabla `thread`
--
ALTER TABLE `thread`
  ADD CONSTRAINT `CategoriaThread` FOREIGN KEY (`IdCategoriaForo`) REFERENCES `categoriaforo` (`IdCategoriaForo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SagaThread` FOREIGN KEY (`IdSaga`) REFERENCES `saga` (`IdSaga`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UsuarioThread` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `TipoDeUsuario` FOREIGN KEY (`TipoDeUsuario`) REFERENCES `tiposusuario` (`idTipo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarioemoticon`
--
ALTER TABLE `usuarioemoticon`
  ADD CONSTRAINT `EmoticonUsuario` FOREIGN KEY (`IdEmoticon`) REFERENCES `emoticon` (`IdEmoticon`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `UsuarioEmoticon` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuariologros`
--
ALTER TABLE `usuariologros`
  ADD CONSTRAINT `LogrosUsuario` FOREIGN KEY (`IdLogro`) REFERENCES `logros` (`IdLogro`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `UsuarioLogros` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarioropa`
--
ALTER TABLE `usuarioropa`
  ADD CONSTRAINT `RopaUsuario` FOREIGN KEY (`IdRopa`) REFERENCES `ropa` (`IdRopa`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `UsuarioRopa` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarioventa`
--
ALTER TABLE `usuarioventa`
  ADD CONSTRAINT `VentaUsuario` FOREIGN KEY (`IdVenta`) REFERENCES `venta` (`IdVenta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `SagaVenta` FOREIGN KEY (`IdSaga`) REFERENCES `saga` (`IdSaga`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UsuarioVenta` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `HolderUsuario` FOREIGN KEY (`IdHolder`) REFERENCES `holder` (`IdHolder`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UsuarioContenido` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
