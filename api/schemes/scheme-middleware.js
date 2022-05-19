const db = require("../../data/db-config")

const checkSchemeId = async (req, res, next) => {
  try{
    const id = await db("schemes")
    .where("scheme_id", req.params.scheme_id)
    .first()

    if(!id){
      next({
        status: 404, 
        message: `scheme with scheme_id ${req.params.scheme_id} not found`
      })
    } else {
      next()
    }
  } catch(err){
    next(err)
  }
}

const validateScheme = async (req, res, next) => {
    const { scheme_name } = req.body
  if(
    scheme_name === undefined ||
    typeof scheme_name !== "string" ||
    !scheme_name.trim() 
  ) {
    next({
      status: 400, 
      message: "invalid scheme_name"
    })
  } else {
    next()
  }
}

const validateStep = (req, res, next) => {
  const { step_number, instructions } = req.body
  if( 
    instructions === undefined ||
    !instructions.trim() || 
    typeof instructions !== "string"||
    typeof step_number !== "number" ||
    step_number < 1
  ){
    next({
      status: 400,
      message: "invalid step"
    })
  }else{
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
