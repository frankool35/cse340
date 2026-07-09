// Define the home page controller
const showHomePage = async (req, res) => {
    const title = "Home";

    res.render("home", {
        title
    });
};

// Export the controller
export { showHomePage };