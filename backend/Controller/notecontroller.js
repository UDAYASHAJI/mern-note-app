const NoteModel = require("../Models/noteschema");

const createnote = async (req, res) => {
  try {
    const { date, title, content } = req.body;

    if (!date || !title || !content) {
      return res.status(400).json({
        message: "Date, title, and content are required",
        success: false,
      });
    }

    const newnote = new NoteModel({ date, title, content });
    await newnote.save();

    return res.status(201).json({
      message: "New Note Added",
      success: true,
      result: newnote,
    });
  } catch (error) {
    console.error("Error adding note:", error);
    return res.status(500).json({
      message: "Failed to add Note",
      success: false,
    });
  }
};

const viewnote = async (req, res) => {
  try {
    const allnotes = await NoteModel.find({})
      .select("date title content")
      .sort({ date: -1 });

    return res.status(200).json({
      message: "Fetched all Notes",
      success: true,
      result: allnotes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({
      message: "Failed to fetch Notes",
      success: false,
    });
  }
};

const deletenote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletednote = await NoteModel.findByIdAndDelete(id);
    if (deletednote) {
      return res.status(200).json({
        message: "Deleted Note",
        success: true,
        result: deletednote,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "failed to delete note",
      success: false,
    });
  }
};

const updatenote = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, title, content } = req.body;

    // Validate input
    if (!date || !title || !content) {
      return res.status(400).json({
        message: "Date, title, and content are required",
        success: false,
      });
    }

    // Update note
    const updatednote = await NoteModel.findByIdAndUpdate(
      id,
      { date, title, content },
      { new: true } // return the updated document
    );

    if (!updatednote) {
      return res.status(404).json({
        message: "Note not found",
        success: false,
      });
    }

    // Success response
    return res.status(200).json({
      message: "Note updated successfully",
      success: true,
      result: updatednote,
    });

  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({
      message: "Failed to update note",
      success: false,
    });
  }
};

module.exports = { createnote, viewnote, deletenote ,updatenote};
