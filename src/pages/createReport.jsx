const inputConfig = [
  [
    { labelTxt: "Title", label: "title", type: "text" },
    { labelTxt: "Location", label: "location", type: "text" },
  ],
  [
    { labelTxt: "Category", label: "category", type: "text" },
    { label: "images" },
  ],
  [
    { labelTxt: "Description", label: "description", type: "text" },
    { label: "type" },
  ],
];
function CreateReport() {
  return (
    <div className="create-report-container min-h-screen flex flex-col justify-center lg:px-30 md:px-20 sm:px-15 px-9 md:pt-0 pt-25">
    </div>
  );
}

export default CreateReport;
