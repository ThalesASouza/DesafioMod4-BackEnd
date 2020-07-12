import { studentModel } from "../models/index.js";
import { logger } from "../config/logger.js";

const create = async (req, res) => {
  console.log(req.body);
  try {
    const { name, subject, type, value } = req.body;
    const lastModified = new Date();
    const createStudent = await studentModel.insertMany(
      {
        name,
        subject,
        type,
        value,
        lastModified
      }
    )
    if (!createStudent) {
      res.status(400).send("Registro não inserido");
    }
    res.send();
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    let buscar = null;
    if(name!==undefined){
      buscar = await studentModel.find({name:name});
    }else{
      buscar = await studentModel.find();
    }
    if(!buscar){
      res.status(400).send("nada encontrado")
    }
    res.send(buscar);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {

    const buscar = await studentModel.findOne({_id:id});
    if(!buscar){
      res.status(400).send("nada encontrado")
    }
    res.send(buscar);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;

  try {
    const att = await studentModel.findByIdAndUpdate({_id:id},req.body)
    res.send({ message: "Grade atualizado com sucesso" });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const del = await studentModel.findByIdAndDelete({_id:id})
    res.send({ message: "Grade excluido com sucesso" });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const delAll = await studentModel.deleteMany({});
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
