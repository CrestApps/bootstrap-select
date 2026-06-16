/* eslint-disable no-undef */
// Shared ordered source fragment consumed by the Grunt JS build.
  // runs when the dropdown is about to be shown
  onShow () {
    if (this.options.liveSearch && this.searchbox.value) {
      this.searchbox.value = '';
      this.selectpicker.search.previousValue = undefined;
    }

    if (!this.newElement.classList.contains(classNames.SHOW)) {
      this.setSize();
    }
  }

  setPositionData () {
    this.selectpicker.view.canHighlight = [];
    this.selectpicker.view.size = 0;
    this.selectpicker.view.firstHighlightIndex = false;

    for (var i = 0; i < this.selectpicker.current.data.length; i++) {
      var li = this.selectpicker.current.data[i],
          canHighlight = true;

      if (li.type === 'divider') {
        canHighlight = false;
        li.height = this.sizeInfo.dividerHeight;
      } else if (li.type === 'optgroup-label') {
        canHighlight = false;
        li.height = this.sizeInfo.dropdownHeaderHeight;
      } else {
        li.height = this.sizeInfo.liHeight;
      }

      if (li.disabled) canHighlight = false;

      this.selectpicker.view.canHighlight.push(canHighlight);

      if (canHighlight) {
        this.selectpicker.view.size++;
        li.posinset = this.selectpicker.view.size;
        if (this.selectpicker.view.firstHighlightIndex === false) this.selectpicker.view.firstHighlightIndex = i;
      }

      li.position = (i === 0 ? 0 : this.selectpicker.current.data[i - 1].position) + li.height;
    }
  }

  isVirtual () {
    return (this.options.virtualScroll !== false) && (this.selectpicker.main.data.length >= this.options.virtualScroll) || this.options.virtualScroll === true;
  }

  createView (isSearching, setSize, refresh) {
    var that = this,
        scrollTop = 0;

    this.selectpicker.isSearching = isSearching;
    this.selectpicker.current = isSearching ? this.selectpicker.search : this.selectpicker.main;

    this.setPositionData();

    if (setSize) {
      if (refresh) {
        scrollTop = this.menuInner.scrollTop;
      } else if (!that.multiple) {
        var element = that.element,
            selectedIndex = (element.options[element.selectedIndex] || {}).liIndex;

        if (typeof selectedIndex === 'number' && that.options.size !== false) {
          var selectedData = that.selectpicker.main.data[selectedIndex],
              position = selectedData && selectedData.position;

          if (position) {
            scrollTop = position - ((that.sizeInfo.menuInnerHeight + that.sizeInfo.liHeight) / 2);
          }
        }
      }
    }

    scroll(scrollTop, true);

    this._replace('createViewScroll', this.menuInner, 'scroll', function () {
      if (!that.noScroll) scroll(that.menuInner.scrollTop);
      that.noScroll = false;
    });

    function scroll (scrollTop, init) {
      var size = that.selectpicker.current.data.length,
          chunks = [],
          chunkSize,
          chunkCount,
          firstChunk,
          lastChunk,
          currentChunk,
          prevPositions,
          positionIsDifferent,
          previousElements,
          menuIsDifferent = true,
          isVirtual = that.isVirtual();

      that.selectpicker.view.scrollTop = scrollTop;

      chunkSize = that.options.chunkSize; // number of options in a chunk
      chunkCount = Math.ceil(size / chunkSize) || 1; // number of chunks

      for (var i = 0; i < chunkCount; i++) {
        var endOfChunk = (i + 1) * chunkSize;

        if (i === chunkCount - 1) {
          endOfChunk = size;
        }

        chunks[i] = [
          (i) * chunkSize + (!i ? 0 : 1),
          endOfChunk
        ];

        if (!size) break;

        if (currentChunk === undefined && scrollTop - 1 <= that.selectpicker.current.data[endOfChunk - 1].position - that.sizeInfo.menuInnerHeight) {
          currentChunk = i;
        }
      }

      if (currentChunk === undefined) currentChunk = 0;

      prevPositions = [that.selectpicker.view.position0, that.selectpicker.view.position1];

      // always display previous, current, and next chunks
      firstChunk = Math.max(0, currentChunk - 1);
      lastChunk = Math.min(chunkCount - 1, currentChunk + 1);

      that.selectpicker.view.position0 = isVirtual === false ? 0 : (Math.max(0, chunks[firstChunk][0]) || 0);
      that.selectpicker.view.position1 = isVirtual === false ? size : (Math.min(size, chunks[lastChunk][1]) || 0);

      positionIsDifferent = prevPositions[0] !== that.selectpicker.view.position0 || prevPositions[1] !== that.selectpicker.view.position1;

      if (that.activeElement !== undefined) {
        if (init) {
          if (that.activeElement !== that.selectedElement) {
            that.defocusItem(that.activeElement);
          }
          that.activeElement = undefined;
        }

        if (that.activeElement !== that.selectedElement) {
          that.defocusItem(that.selectedElement);
        }
      }

      if (that.prevActiveElement !== undefined && that.prevActiveElement !== that.activeElement && that.prevActiveElement !== that.selectedElement) {
        that.defocusItem(that.prevActiveElement);
      }

      if (init || positionIsDifferent || that.selectpicker.current.hasMore) {
        previousElements = that.selectpicker.view.visibleElements ? that.selectpicker.view.visibleElements.slice() : [];

        if (isVirtual === false) {
          that.selectpicker.view.visibleElements = that.selectpicker.current.elements;
        } else {
          that.selectpicker.view.visibleElements = that.selectpicker.current.elements.slice(that.selectpicker.view.position0, that.selectpicker.view.position1);
        }

        that.setOptionStatus();

        // if searching, check to make sure the list has actually been updated before updating DOM
        // this prevents unnecessary repaints
        if (isSearching || (isVirtual === false && init)) menuIsDifferent = !isEqual(previousElements, that.selectpicker.view.visibleElements);

        // if virtual scroll is disabled and not searching,
        // menu should never need to be updated more than once
        if ((init || isVirtual === true) && menuIsDifferent) {
          var menuInner = that.menuInner,
              menuFragment = document.createDocumentFragment(),
              emptyMenu = menuInner.firstChild.cloneNode(false),
              marginTop,
              marginBottom,
              elements = that.selectpicker.view.visibleElements,
              toSanitize = [];

          // replace the existing UL with an empty one - this is faster than emptying it
          menuInner.replaceChild(emptyMenu, menuInner.firstChild);

          for (var i = 0, visibleElementsLen = elements.length; i < visibleElementsLen; i++) {
            var element = elements[i],
                elText,
                elementData;

            if (that.options.sanitize) {
              elText = element.lastChild;

              if (elText) {
                elementData = that.selectpicker.current.data[i + that.selectpicker.view.position0];

                if (elementData && elementData.content && !elementData.sanitized) {
                  toSanitize.push(elText);
                  elementData.sanitized = true;
                }
              }
            }

            menuFragment.appendChild(element);
          }

          if (that.options.sanitize && toSanitize.length) {
            sanitizeHtml(toSanitize, that.options.whiteList, that.options.sanitizeFn);
          }

          if (isVirtual === true) {
            marginTop = (that.selectpicker.view.position0 === 0 ? 0 : that.selectpicker.current.data[that.selectpicker.view.position0 - 1].position);
            marginBottom = (that.selectpicker.view.position1 > size - 1 ? 0 : that.selectpicker.current.data[size - 1].position - that.selectpicker.current.data[that.selectpicker.view.position1 - 1].position);

            menuInner.firstChild.style.marginTop = marginTop + 'px';
            menuInner.firstChild.style.marginBottom = marginBottom + 'px';
          } else {
            menuInner.firstChild.style.marginTop = 0;
            menuInner.firstChild.style.marginBottom = 0;
          }

          menuInner.firstChild.appendChild(menuFragment);

          // if an option is encountered that is wider than the current menu width, update the menu width accordingly
          if (isVirtual === true && that.sizeInfo.hasScrollBar) {
            var menuInnerInnerWidth = menuInner.firstChild.offsetWidth;

            if (init && menuInnerInnerWidth < that.sizeInfo.menuInnerInnerWidth && that.sizeInfo.totalMenuWidth > that.sizeInfo.selectWidth) {
              menuInner.firstChild.style.minWidth = that.sizeInfo.menuInnerInnerWidth + 'px';
            } else if (menuInnerInnerWidth > that.sizeInfo.menuInnerInnerWidth) {
              // set to 0 to get actual width of menu
              that.menu.style.minWidth = 0;

              var actualMenuWidth = menuInner.firstChild.offsetWidth;

              if (actualMenuWidth > that.sizeInfo.menuInnerInnerWidth) {
                that.sizeInfo.menuInnerInnerWidth = actualMenuWidth;
                menuInner.firstChild.style.minWidth = that.sizeInfo.menuInnerInnerWidth + 'px';
              }

              // reset to default CSS styling
              that.menu.style.minWidth = '';
            }
          }
        }

        if ((!isSearching && that.options.source.data || isSearching && that.options.source.search) && that.selectpicker.current.hasMore && currentChunk === chunkCount - 1) {
          // Don't load the next chunk until scrolling has started
          // This prevents unnecessary requests while the user is typing if pageSize is <= chunkSize
          if (scrollTop > 0) {
            // Chunks use 0-based indexing, but pages use 1-based. Add 1 to convert and add 1 again to get next page
            var page = Math.floor((currentChunk * that.options.chunkSize) / that.options.source.pageSize) + 2;

            that.fetchData(function () {
              that.render();
              that.buildList(size, isSearching);
              that.setPositionData();
              scroll(scrollTop);
            }, isSearching ? 'search' : 'data', page, isSearching ? that.selectpicker.search.previousValue : undefined);
          }
        }
      }

      that.prevActiveElement = that.activeElement;

      if (!that.options.liveSearch) {
        that.menuInner.focus();
      } else if (isSearching && init) {
        var index = 0,
            newActive;

        if (!that.selectpicker.view.canHighlight[index]) {
          index = 1 + that.selectpicker.view.canHighlight.slice(1).indexOf(true);
        }

        newActive = that.selectpicker.view.visibleElements[index];

        that.defocusItem(that.selectpicker.view.currentActive);

        that.activeElement = (that.selectpicker.current.data[index] || {}).element;

        that.focusItem(newActive);
      }
    }

    this._replace('createViewResize', window, 'resize', function () {
      var isActive = that.newElement.classList.contains(classNames.SHOW);

      if (isActive) scroll(that.menuInner.scrollTop);
    });
  }

  focusItem (li, liData, noStyle) {
    if (li) {
      liData = liData || this.selectpicker.current.data[this.selectpicker.current.elements.indexOf(this.activeElement)];
      var a = li.firstChild;

      if (a) {
        a.setAttribute('aria-setsize', this.selectpicker.view.size);
        a.setAttribute('aria-posinset', liData.posinset);

        if (noStyle !== true) {
          this.focusedParent.setAttribute('aria-activedescendant', a.id);
          li.classList.add('active');
          a.classList.add('active');
        }
      }
    }
  }

  defocusItem (li) {
    if (li) {
      li.classList.remove('active');
      if (li.firstChild) li.firstChild.classList.remove('active');
    }
  }

  setPlaceholder () {
    var that = this,
        updateIndex = false;

    if ((this.options.placeholder || this.options.allowClear) && !this.multiple) {
      if (!this.selectpicker.view.titleOption) this.selectpicker.view.titleOption = document.createElement('option');

      // this option doesn't create a new <li> element, but does add a new option at the start,
      // so startIndex should increase to prevent having to check every option for the bs-title-option class
      updateIndex = true;

      var element = this.element,
          selectTitleOption = false,
          titleNotAppended = !this.selectpicker.view.titleOption.parentNode,
          selectedIndex = element.selectedIndex,
          selectedOption = element.options[selectedIndex],
          firstSelectable = element.querySelector('select > *:not(:disabled)'),
          firstSelectableIndex = firstSelectable ? firstSelectable.index : 0,
          navigation = window.performance && window.performance.getEntriesByType('navigation'),
          // Safari doesn't support getEntriesByType('navigation') - fall back to performance.navigation
          isNotBackForward = (navigation && navigation.length) ? navigation[0].type !== 'back_forward' : window.performance.navigation.type !== 2;

      if (titleNotAppended) {
        // Use native JS to prepend option (faster)
        this.selectpicker.view.titleOption.className = 'bs-title-option';
        this.selectpicker.view.titleOption.value = '';

        // Check if selected or data-selected attribute is already set on an option. If not, select the titleOption option.
        selectTitleOption = !selectedOption || (selectedIndex === firstSelectableIndex && selectedOption.defaultSelected === false);
      }

      if (titleNotAppended || this.selectpicker.view.titleOption.index !== 0) {
        element.insertBefore(this.selectpicker.view.titleOption, element.firstChild);
      }

      // Set selected *after* appending to select
      if (selectTitleOption && isNotBackForward) {
        element.selectedIndex = 0;
      } else if (document.readyState !== 'complete') {
        // if navigation type is back_forward, there's a chance the select will have its value set by BFCache
        // wait for that value to be set, then run render again
        window.addEventListener('pageshow', function () {
          if (that.selectpicker.view.displayedValue !== element.value) that.render();
        });
      }
    }

    return updateIndex;
  }

