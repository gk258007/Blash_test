import ReactDOMServer from 'react-dom/server';
import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useFirebaseAPI } from "./useFirebaseAPI";
import { componentsList, TableComponent, InputComponent, ButtonComponent } from "./components";
import Loader from "./Loader";

const ComponentMap = {
  table: TableComponent,
  input: InputComponent,
  button: ButtonComponent,
};

const DraggableComponent = ({ id, type }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { type: type },
  });

  const Component = ComponentMap[type];

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
        border: "1px solid #333",
        padding: "10px",
        backgroundColor: "#ddd",
        cursor: "move",
        display: "inline-block",
        margin: "5px",
      }}
    >
      <Component />
    </div>
  );
};

const DroppableCanvas = ({ items }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
    data: {
      accepts: ["table", "input", "button"],
    },
  });

  const style = {
    border: "2px dashed #ccc",
    minHeight: "300px",
    padding: "10px",
    backgroundColor: isOver ? "#e0e0e0" : "#f0f0f0",
    transition: "border-color 0.2s ease",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {items.map((item, index) => {
        const Component = ComponentMap[item.id];
        return <Component key={index} />;
      })}
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);

  const { saveStateToFirebase, loadStateFromFirebase } = useFirebaseAPI();

  useEffect(() => {
    setLoading(true);
    loadStateFromFirebase()
      .then((savedItems) => {
        setItems(savedItems || []);
      })
      .catch((error) => {
        console.error("Error loading state:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("Dropping item:", active.id);

    if (over && over.data.current.accepts.includes(active.data.current.type)) {
      setItems((prevItems) => [...prevItems, { id: active.id }]);
    } else {
      console.log("Invalid drop target");
    }
    setActiveId(null);
  };

  if (loading) {
    return <Loader />;
  }

  const handlePreview = () => {
    const htmlContent = items
      .map((item) => componentsList.find((comp) => comp.id === item.id).html)
      .join("");

    const previewWindow = window.open("", "Preview", "width=600,height=400");


    const styleSheets = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("");
        } catch (e) {
          console.error("Error accessing stylesheet:", e);
          return "";
        }
      })
      .join("");

    previewWindow.document.write(
      `<html>
        <head>
          <style>${styleSheets}</style>
        </head>
        <body>${htmlContent}</body>
      </html>`
    );
    previewWindow.document.close();
  };

  return (
    <div className="App">
      <h1>Drag and Drop Webpage Builder</h1>
      <div className="controls">
        <button onClick={() => saveStateToFirebase(items)}>Save State</button>
        <button onClick={handlePreview}>Preview</button>
      </div>
      <div className="builder">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="sidebar">
            <h2>Components</h2>
            {componentsList.map((component) => (
              <DraggableComponent key={component.id} id={component.id} type={component.id} />
            ))}
          </div>
          <DroppableCanvas items={items} />
        </DndContext>
      </div>
    </div>
  );
};

export default App;
