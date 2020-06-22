$(() => {
  // Global Selected State
  var selected = {
    postType: "quote",
    theme: "light"
  };

  // Gets Current Date
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  // Toggles Post Type View
  $('input[name=post]').on("input", function() {
    $('.field').addClass("hidden");
    $('.preview-container').addClass("hidden");
    $('input[name=option]').prop('checked', false);
    delete selected.layout;
    switch ($(this).val()) {
      case 'quote':
        $('.field-quote').removeClass("hidden");
        $('#quote-preview-container').removeClass("hidden");
        selected.postType = "quote";
      break;
      case 'question':
        $('.field-question').removeClass("hidden");
        $('#question-preview-container').removeClass("hidden");
        selected.postType = "question";
      break;
      case 'fact':
        $('.field-fact').removeClass("hidden");
        $('#fact-preview-container').removeClass("hidden");
        selected.postType = "fact";
      break;
      case 'fill':
        $('.field-fill').removeClass("hidden");
        $('#fill-preview-container').removeClass("hidden");
        selected.postType = "fill";
      break;
    };
  })

  // Toggles Light And Dark Theme
  $('input[name=theme]').on("input", function() {
    let selectedTheme = $(this)[0].value;
    selected.theme = selectedTheme;
    selected.theme === "dark" ? $('.preview-container').addClass('dark-theme') : $('.preview-container').removeClass('dark-theme') ;
  });

  // Toggle Selected Layout
  $('input[name=option]').on("input", function() {
    let selectedOptionRadio = $(this);
    selected.layout = selectedOptionRadio[0].id
    $('.option').removeClass('selected custom-shadow')
    selectedOptionRadio.parent().next().addClass('selected custom-shadow')
  });

  // Render Content Live
  let outPutContent = (input, output, outputType) => {
    switch(outputType) {
      case "quote":
        input.on('input', () => {
          input.val() != "" ? output.html(`"${input.val()}"`) : output.html(`"${input.attr('placeholder')}"`)
        })
        break;
      case "author":
        input.on('input', () => {
          input.val() != "" ? output.html(`— ${input.val()}`) : output.html(`${input.attr('placeholder')}`)
        })
        break;
      case "text":
        input.on('input', () => {
          input.val() != "" ? output.html(`${input.val()}`) : output.html(`${input.attr('placeholder')}`)
        })
        break;
    }
  }

  // Preview Text Change
  $('body').on('change', function() {
    let previewText = $('#preview-text');
    let selectLayoutText = selected.layout ? selected.layout : "Choose Layout" ;
    previewText.text(`${selected.theme} | ${selectLayoutText}`);
  })

  // Render Fontsize Change
  let outputFontSize = (slider, sizeOutput, text, subheading) => {
    slider.on("input", function() {
      let size = $(this).val();
      sizeOutput.html(`${size}px`)
      subheading ? text.css("font-size", `${size-12}px`) : text.css("font-size", `${size}px`) ;
    })
  }
  // Html2Canvas Download Function
  $("#download").on('click', function () {
    if(selected['layout']) {
      window.scrollTo(0,0)
      html2canvas(document.querySelector("#capture-container .selected"), {
        scrollX: 0,
        scrollY: 0,
      }).then(canvas => {
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/png");
        a.download = `ia_${selected.layout}_${selected.theme}_${date}`;
        a.click();
      });
    } else {
      alert("Please Select A Layout.")
    }
  });
  
  let quoteTextarea = $('#quote .quote textarea')
  let authorInput = $('#quote .author input')
  let quoteFontSlider = $('#quote .font-size input')
  let quoteTextOutput = $('#preview-quote .quote-text-container p')
  let authorOutput = $('#preview-quote .quote-author-container p')
  let quoteFontOutput = $("#quote .font-size span")
  outPutContent( quoteTextarea, quoteTextOutput, "quote" )
  outPutContent( authorInput, authorOutput, "author" )
  outputFontSize( quoteFontSlider, quoteFontOutput, quoteTextOutput )
  outputFontSize( quoteFontSlider, quoteFontOutput, authorOutput, true )
  
  let questionInput = $('#question .question textarea')
  let questionFontSlider = $('#question .font-size input')
  let questionOutput = $('#preview-question .question-text-container p')
  let questionFontOutput = $("#question .font-size span")
  outPutContent( questionInput, questionOutput, "text" )
  outputFontSize( questionFontSlider, questionFontOutput, questionOutput )

  let factInput = $('#fact .fact textarea')
  let factFontSlider = $('#fact .font-size input')
  let factFontOutput = $('#fact .font-size span')
  let factOutput = $('#preview-fact .fact-text-container p')
  outPutContent( factInput, factOutput, "text" )
  outputFontSize( factFontSlider, factFontOutput, factOutput )
  
  let fillInput = $('#fill-input-text')
  let fillFontSlider = $('#fill .font-size input')
  let fillFontOutput = $('#fill .font-size span')
  let fillOutput = $('#preview-fill .fill-text-container p')
  outPutContent( fillInput, fillOutput, "text" )
  outputFontSize( fillFontSlider, fillFontOutput, fillOutput )
})