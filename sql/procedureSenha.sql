CREATE PROCEDURE BuscarUsuario
  @usuario       varchar(50),
  @senha         varchar(50)
  AS 
  BEGIN
    select count(usuario) as [result] from cadusu where CAST(usuario AS varbinary(50)) = CAST(@usuario AS varbinary(50)) and CAST(senha AS varbinary(50)) = CAST(@senha AS varbinary(50));
  END
GO