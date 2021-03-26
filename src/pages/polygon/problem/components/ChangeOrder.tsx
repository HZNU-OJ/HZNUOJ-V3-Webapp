import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";
import { PlusOutlined, MenuOutlined } from "@ant-design/icons";

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
));

// const SortableProblemContentItem = SortableElement(({ orderId }) => {
//   console.log(contentSections);
//   console.log(orderId);
//   return (
//   <>
//   <Row gutter={16} align={"top"}>
//     <Col md={12} style={{ textAlign: "left" }}>
//       <h2>
//         {contentSections[orderId].sectionTitle}
//       </h2>
//     </Col>
//     <Col md={12} style={{ textAlign: "right" }}>
//       <DragHandle />
//     </Col>
//   </Row>
//   {contentSections[orderId].type === "Text" && (
//     <LazyMarkDownEditor
//       height={isMobile ? mobileH : DesktopH}
//       language={"markdown"}
//       value={contentSections[orderId].text}
//       onChange={(value) => {
//         // setContentSections([])
//         // console.log(value);
//         // let _contentSections = deepCopy(contentSections);
//         // if (Index === 0) {
//           contentSections[orderId].text = value;
//           // setContentSections([].concat({
//           //   sectionTitle: contentSections[orderId].sectionTitle,
//           //   type: "Text",
//           //   text: value,
//           // }));
//         // }
//         // setContentSections([].concat())
//         // contentSections[Index].text = value;
//         // setContentSections(contentSections);
//         // console.log(contentSections);
//         // setContentSections(_contentSections);
//       }}
//     />
//   )}
//   </>
//   )
// });

// const SortableProblemContentSection = SortableContainer(({ orderIdList }) => {
//   return (
//     <ul style={{ paddingLeft: 0 }}>
//     {orderIdList.map((orderId: number, index: number) => (
//       <SortableProblemContentItem
//         key={`problem-${params.id}-content-${contentSections[orderId].sectionTitle}`}
//         index={index}
//         orderId={orderId}
//       />
//       ))}
//     </ul>
//   );
// });

// const onSortEnd = ({ oldIndex, newIndex }) => {
//   if (oldIndex !== newIndex) {
//     setContentSections(arrayMove(contentSections, oldIndex, newIndex));
//   }
// };
