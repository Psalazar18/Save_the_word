<template>
  <div>
    <div
      v-show="showMenu"
      class="menu"
      :style="{ left: `${x}px`, top: `${y}px` }"
      @mousedown.prevent=""
    >
      <span class="item" @mousedown.prevent="handleAction('share')">
        Add
      </span>
      <!-- <span class="item" @mousedown.prevent="handleAction('highlight')">
        Highlight
      </span> -->
      <!-- You can add more buttons here -->
    </div>
    <!-- The insterted text should be displayed here -->
    <slot />
  </div>
</template>


<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
      showMenu: false,
      selectedText: "",
    };
  },

  computed: {
    highlightableEl() {
      return this.$slots.default[0].elm;
    },
  },

  mounted() {
    window.addEventListener("mouseup", this.onMouseup);
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.onMouseup);
  },

  methods: {
      onMouseup () {    
          const selection = window.getSelection();
          // console.log("hey");   
          // console.log(selection);
          const selectionRange = selection.getRangeAt(0);  
        // startNode is the element that the selection starts in    
        const startNode = selectionRange.startContainer.parentNode; 
        // endNode is the element that the selection ends in    
        const endNode = selectionRange.endContainer.parentNode;  
        // if the selected text is not part of the highlightableEl (i.e. <p>)    
        // OR    
        // if startNode !== endNode (i.e. the user selected multiple paragraphs)    
        // Then    
        // Don't show the menu (this selection is invalid)    
        if (!startNode.isSameNode(this.highlightableEl) || !startNode.isSameNode(endNode)) {      
            this.showMenu = false;
            return    
        }    
        // Get the x, y, and width of the selection    
        const { x, y, width } = selectionRange.getBoundingClientRect(); 
        // If width === 0 (i.e. no selection)    
        // Then, hide the menu   
        if (!width) {      
            this.showMenu = false;    
            return    
        }    
        // Finally, if the selection is valid,    
        // set the position of the menu element,    
        // set selectedText to content of the selection    
        // then, show the menu    
        this.x = x + (width / 2);  
        this.y = y + window.scrollY - 10;
        this.selectedText = selection.toString();
        //console.log(this.selectedText);
        this.showMenu = true;
    },

    handleAction(action) {
      this.$emit(action, this.selectedText);
    },
  },


};
</script>

<style scoped>
.menu {
  height: 30px;
  padding: 5px 10px;
  background: #333;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -100%);
  transition: 0.2s all;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu:after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
}
.item {
  color: #fff;
  cursor: pointer;
}
.item:hover {
  color: #1199ff;
}
.item + .item {
  margin-left: 10px;
}
</style>
