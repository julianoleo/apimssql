CREATE PROCEDURE BuscaProdutoId
  @id    int
  AS 
  BEGIN
        select * from dbo.produtoServico where idProdutoServico = @id;
  END
GO