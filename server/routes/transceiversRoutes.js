import {Router} from 'express'
import Sfp from '../models/sfp.js';
const router = Router()


const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string' || string.length === 0) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};


// POST route to add a new SFP
router.post('/addTransceivers', async (req, res) => {
  let sfpNew = req.body;

  try {
    const cleanedSfp = {
      ...sfpNew,
      p_n: sfpNew.p_n.trim(),
      descripcion: sfpNew.descripcion.trim(),
      marca: capitalizeFirstLetter(sfpNew.marca),
      p_a: sfpNew.p_a.trim(),
      state: sfpNew.state.trim()
    };

    const existingSfp = await Sfp.findOne({
      p_n: cleanedSfp.p_n,
      state: cleanedSfp.state
    });

    if (existingSfp) {
      return res.status(409).json({
        message: 'Error adding SFP',
        error: `A product with Part Number "${cleanedSfp.p_n}" and State "${cleanedSfp.state}" already exists.`
      });
    }

    const newSfp = await Sfp.create(cleanedSfp);
    
    res.status(201).json({
      message: 'SFP added successfully!',
      data: newSfp
    });

  } catch (error) {
    console.error('Error adding SFP:', error);
    res.status(400).json({
      message: 'Error adding SFP',
      error: error.message
    });
  }
});


// Get route to select all data
router.get('/allTransceivers', async (req, res) => {
  try {
    const allSfp = await Sfp.find()
    
    res.status(200).json(allSfp);

  } catch (error) {
    console.error('Error adding SFP:', error);
    res.status(500).json({
      message: 'Error adding SFP',
      error: error.message
    });
  }
});
export default router;