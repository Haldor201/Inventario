import {Router} from 'express'
import Sfp from '../models/sfp.js';
const router = Router()
import mongoose from 'mongoose';

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

// PUT route to edit an existing SFP
router.patch('/editTransceiver/:id', async (req, res) => {
  const { id } = req.params;  
  const updatedData = req.body;
  console.log(updatedData)
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid SFP ID provided.' });
    }

    const sfpUpdated = await Sfp.findByIdAndUpdate(id, updatedData, {
      new: true, 
      runValidators: true
    });

    if (!sfpUpdated) {
      return res.status(404).json({ message: 'SFP not found.' });
    }

    res.status(200).json({
      message: 'SFP updated successfully!',
      data: sfpUpdated
    });

  } catch (error) {
    console.error('Error updating SFP:', error);
    res.status(400).json({
      message: 'Error updating SFP',
      error: error.message
    });
  }
});

// DELETE route to delete an SFP
router.delete('/deleteTransceiver/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid SFP ID provided.' });
    }
    const sfpDeleted = await Sfp.findByIdAndDelete(id);

    if (!sfpDeleted) {
      return res.status(404).json({ message: 'SFP not found.' });
    }

    res.status(200).json({
      message: 'SFP deleted successfully!',
      data: sfpDeleted
    });

  } catch (error) {
    console.error('Error deleting SFP:', error);
    res.status(500).json({
      message: 'Error deleting SFP',
      error: error.message
    });
  }
});

export default router;